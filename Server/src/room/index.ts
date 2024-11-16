import { Socket } from "socket.io";
import {v4 as uuidV4} from "uuid";

export const roomHandler = (socket: Socket) => {

  // Create Room Functions
  const createRoom = () => {
    const roomId = uuidV4();
    socket.emit("room-created", {roomId})
    console.log("user created the room");
  };

  // join Room Functions
  const joinRoom = ({roomId}: {roomId: string}) => {
    console.log("user joined the room", roomId);
    socket.join(roomId);

  };

  // Create Room
  socket.on("create-room", createRoom);

  // join Room
  socket.on("join-room", joinRoom);
};
