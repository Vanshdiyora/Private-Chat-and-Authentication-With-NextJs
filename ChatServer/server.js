const { saveMessage, findMessageForUser } = require('./message');
const io = require("socket.io")(3000, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ["GET", "POST"],
  },
});

const users = {};
const emailToSocket = {};

function getMessagesForUser(userId) {
  const messagePerUser = new Map();
  findMessageForUser(userId).forEach((message) => {
    const { from, to } = message;
    const otherUser = userId === from ? to : from;
    if (messagePerUser.has(otherUser)) {
      messagePerUser.get(otherUser).push(message);
    } else {
      messagePerUser.set(otherUser, [message]);
    }
  });
  return messagePerUser;
}

io.on("connection", (socket) => {
  console.log("a user connected");
  const userId = socket.id;

  socket.on("user message", ({ email, curr }) => {
    const userId = email;
    if (!userId) {
      socket.emit("user message", []);
      return;
    }
    const userMessages = getMessagesForUser(userId);
    socket.emit("user message", userMessages.get(curr) || []);
  });

  socket.on('register', (email) => {
    if (emailToSocket[email]) {
      const existingSocketId = emailToSocket[email];
      delete users[existingSocketId];
    }
    users[socket.id] = email;
    emailToSocket[email] = socket.id;
    io.emit('connectedUsers', users);
  });

  socket.on('message', ({ message, user, targetSocketId }) => {
    saveMessage({ from: user, message, to: users[targetSocketId] });
    socket.emit("message", { from: user, message, to: users[targetSocketId] });
    socket.to(targetSocketId).emit("message", { from: user, message, to: users[targetSocketId] })
    const senderMessages = getMessagesForUser(user);
    socket.emit("user message", senderMessages.get(users[targetSocketId]));
  });

  socket.on("callUser", (data) => {
    console.log(emailToSocket[data.from])

    socket.to(data.userToCall).emit("callUser", { signal: data.signalData, from: emailToSocket[data.from], name: data.name })
  });

  socket.on("answerCall", ({signal,to}) => {
    socket.to(to).emit("callAccepted", signal);
  });

  socket.on("endCall", ({ to }) => {
    socket.to(to).emit("callEnded");
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");

    console.log('user disconnected');
    const email = users[socket.id];
    if (email) {
      delete emailToSocket[email];
      delete users[socket.id];
      io.emit('connectedUsers', users);
    }
  });
});

console.log("Server running");
