import { Socket } from "socket.io";
import {v4 as uuidV4} from "uuid";


const rooms: Record<string, string[]> = {}

interface IRoomParams{
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {

  // Create Room Functions
  const createRoom = () => {
    const roomId = uuidV4();
    rooms[roomId] = [];
    socket.emit("room-created", {roomId})
    console.log("user created the room");
  };

  // join Room Functions
  const joinRoom = ({roomId, peerId}: IRoomParams) => {
    if(rooms[roomId]){
    console.log("user joined the room", roomId, peerId);
    rooms[roomId].push(peerId);
    socket.join(roomId);

    socket.to(roomId).emit("user-joined", {peerId});

    // Get Users
    socket.emit("get-users", {
      roomId,
      participants: rooms[roomId],
    });
    }

    socket.on("disconnect", ()=>{
      console.log("user left the room", peerId);
      leaveRoom({roomId, peerId});
    })
  };

  const leaveRoom = ({peerId, roomId}:IRoomParams)=>{
    rooms[roomId] = rooms[roomId].filter((id)=> id !== peerId);
    socket.to(roomId).emit("user-disconnected", peerId);
  }

  // Create Room
  socket.on("create-room", createRoom);

  // join Room
  socket.on("join-room", joinRoom);
};
