import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/chat.module.css';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ChatComponent from '@/components/ChatComponent';
import ReactPlayer from 'react-player';
import Peer from "simple-peer/simplepeer.min.js";

const Slug = () => {
  const userState = useSelector((state) => state.user);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const [msgBox, setMsgBox] = useState([]);
  const [curr, setCurr] = useState('');
  const [connectedUsers, setConnectedUsers] = useState({});
  const [targetSocketId, setTargetSocketId] = useState('');
  const [user, setUser] = useState('');
  const [show, setShow] = useState(false);
  const [stream, setStream] = useState(null);
  const [userStream, setUserStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef();
  const [name, setName] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    const socket = io('http://localhost:3000');
    setSocket(socket);
    setCurr(router.query.slug);

    socket.on('message', (message) => {
      if ((message.from === router.query.slug && message.to === user) ||(message.from === user && message.to === router.query.slug)) {
        setMsgBox((msg) => [...msg, message]);
        handleAlert(message.from, false);
      } else {
        handleAlert(message.from, true);
      }
    });

    socket.on('connectedUsers', (users) => {
      const formattedUsers = Object.keys(users).reduce((acc, key) => {
        acc[key] = { email: users[key], hasMessage: false };
        return acc;
      }, {});
      setConnectedUsers(formattedUsers);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setName(data.name);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on("callEnded", () => {
      resetCallState();
    });

    if (router.query.slug) {
      socket.emit('register', router.query.slug);
    }

    return () => {
      socket.off('message');
      socket.off('connectedUsers');
    };
  }, [router.isReady, router.query.slug, user]);

  const resetCallState = () => {
    setCallAccepted(false);
    setCallEnded(false);
    setReceivingCall(false);
    setCaller("");
    setCallerSignal(null);
    setName("");
    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null; // Clear the reference
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setUserStream(null);
  };

  const leaveCall = () => {
    resetCallState();
    if (socket && targetSocketId) {
      socket.emit("endCall", { to: targetSocketId });
    }
  };

  const endCallCleanup = () => {
    resetCallState();
  };

  const callUser = (id) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: mediaStream
        });

        peer.on("signal", (data) => {
          setName(curr);
          socket.emit("callUser", {
            userToCall: id,
            signalData: data,
            from: curr,
            name: curr
          });
        });

        peer.on("stream", (stream) => {
          setUserStream(stream);
        });

        socket.on("callAccepted", (signal) => {
          setCallAccepted(true);
          peer.signal(signal);
        });

        connectionRef.current = peer;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

  const declineCall = () => {
    // Reset call state
    setReceivingCall(false);
    setCaller("");
    setCallerSignal(null);
    setName("");
  
    // Destroy peer connection if it exists
    // if (connectionRef.current) {
    //   connectionRef.current.destroy();
    //   connectionRef.current = null; // Ensure to clear the ref
    // }
  
    // Notify the caller that the call has ended
    if (socket && caller) {
      socket.emit("endCall", { to: caller });
    }
  };
  
  const answerCall = () => {
    setCallAccepted(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: mediaStream
        });
  
        peer.on("signal", (data) => {
          socket.emit("answerCall", { signal: data, to: caller });
        });
  
        peer.on("stream", (stream) => {
          setUserStream(stream);
        });
  
        peer.signal(callerSignal);
        connectionRef.current = peer;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };
  

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('message', { message, user: curr, targetSocketId });
      setMessage('');
    }
  };

  const handleAlert = (email, status) => {
    setConnectedUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };
      const userId = Object.keys(updatedUsers).find(
        (key) => updatedUsers[key].email === email
      );
      if (userId) {
        updatedUsers[userId] = { ...updatedUsers[userId], hasMessage: status };
      }
      return updatedUsers;
    });
  };

  const handleUserClick = (id, email) => {
    setUser(email);
    setTargetSocketId(id);
    socket.emit('user message', { email: email, curr: curr });
    setMsgBox([]);
    setShow(true);
    handleAlert(email, false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contHead}>
        <div className={styles.contHeadLeft}>Welcome, {router.query.slug}</div>
        <div className={styles.users}>
          {(callAccepted && !callEnded) ?
            <>

              <div style={{ position: 'relative' }}>

                <div style={{ position: 'relative', display: 'inline-block' }}>

                  <span>{name==curr?'you':name}</span>
                  <ReactPlayer playing url={userStream} autoPlay height={'300px'} width={'300px'} />


                  <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    {stream && (
                      <ReactPlayer url={stream} playing muted autoPlay height={'100px'} width={'100px'} />
                    )}
                  </div>
                </div>


              </div>
            </>
            :
            <>
              {stream && (

                <ReactPlayer url={stream} playing muted autoPlay height={'100px'} width={'100px'} />
              )}
            </>}

          {Object.entries(connectedUsers).map(([key, user]) => {
            if (user.email && user.email !== router.query.slug) {
              return (
                <div key={key}>
                  <p
                    onClick={() => handleUserClick(key, user.email)}
                    className={targetSocketId === key ? styles.pppp : styles.pp}
                  >
                    {user.email}
                    {user.hasMessage && <span className={styles.alert}></span>}
                  </p>
                </div>
              );
            }
            return null;
          })}
          {receivingCall && !callAccepted ? (
            <div>
              <h1>{name} is calling...</h1>
              <button className={styles.ansBtn} onClick={answerCall}>
                Answer
              </button>
              <button className={styles.declineBtn} onClick={declineCall}>
                Decline
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.chatBox}>
        <ChatComponent
          user={user}
          msgBox={msgBox}
          toId={targetSocketId}
          socket={socket}
          curr={curr}
          show={show}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          leaveCall={leaveCall}
          callUser={callUser}
          callAccepted={callAccepted}
          name={name}
          callEnded={callEnded}
        />
      </div>
    </div>
  );
};

export default Slug;
