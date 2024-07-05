import { SlCallEnd } from "react-icons/sl";
import React, { useEffect, useRef } from 'react';
import styles from '../styles/chat.module.css';
import { CiVideoOn } from "react-icons/ci";

function ChatComponent({ user, msgBox, toId, socket, curr,name, show, message, setMessage, handleSendMessage,leaveCall,callAccepted,callEnded,callUser }) {
  const chatContainerRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'auto'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgBox]);

  const chat = () => {
    return (
      <div className={styles.chatting} ref={chatContainerRef}>
        {msgBox && msgBox.map((msg, key) => (
          <div
            key={key}
            className={msg.from === curr ? styles.chatLeft : styles.chatRight}
          >
            <div className={styles.mess}>
              <span className={styles.userName}>{msg.from === curr ? 'You' : msg.from}</span>
              <div>{msg.message}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {show ? (
        <>
          <div >
            {!user ? (<p style={{ paddingLeft: '30px', color: 'white' }}>Select user</p>) : (<p style={{ paddingLeft: '30px', color: 'white' }}>{user}</p>)}
           
           <div className={styles.msgbtns}>

            <input type="text" value={message}placeholder={`Message ${toId}`}onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              />
            <button onClick={handleSendMessage}>Send</button>
            {callAccepted && !callEnded ? (
             <SlCallEnd style={{fontSize:'30px',cursor:'pointer',color:'red'}} onClick={leaveCall}/>
          ) : (
            <CiVideoOn style={{fontSize:'30px',cursor:'pointer'}} onClick={() => callUser(toId)} />
          )}
         
           
              </div>
            
          </div>
          {chat()}
        </>
      ) : (
        <>Select the user</>
      )}
    </div>
  );
}

export default ChatComponent;
