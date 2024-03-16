import { io } from "socket.io-client";

export const useSocket =  () => {
  try {
    // console.log('reached to useSocket');
    
    const socket =   io("http://localhost:3001");
    // console.log('socket from useSocket',socket);
    // console.log(socket.connected,'socket connected from use socket');
    
    return {socket,connected:socket.connected};
  } catch (err) {
    console.log(err);
    return null;
  }
};
