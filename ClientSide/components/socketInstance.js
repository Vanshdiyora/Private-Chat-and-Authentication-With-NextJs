// utils/socket.js
import { io } from 'socket.io-client';

let socketInstance;

export const getSocketInstance = () => {
  if (!socketInstance) {
    socketInstance = io('http://localhost:3000');
  }
  return socketInstance;
};
