"use client";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import { createContext, ReactNode, useEffect, useState, useReducer } from "react";
import socketIOClient from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import { peersReducer  } from "./peerReducer";
import { addPeerAction } from "./peerActions";

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const router = useRouter();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  
  const [peers, dispatch] = useReducer(peersReducer,{});
  
    // Enter Room
    const enterRoom = ({roomId}: {roomId: string})=> {
        console.log({roomId})
        router.push(`/room/${roomId}`);
    }

    // Get Users
    const getUsers = ({ participants }: { participants: string[] }) => {
      console.log({ participants });
    };


    useEffect(()=>{
      const meId = uuidV4();

      const peer = new Peer(meId);
      setMe(peer);

      try{
        navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream)=>{
          setStream(stream);
        })
      }catch(error){
          console.log(error)
      }
      

      ws.on("room-created", enterRoom);
      ws.on("get-users", getUsers);
      return () => {
        ws.off("room-created", enterRoom);
        ws.off("get-users", getUsers);
      };
    }, []);


    useEffect(()=> {
      if(!me) return;
      if(!stream) return;

      ws.on("user-joined", ({peerId})=> {
        const call = me.call(peerId, stream);
        call.on("stream", (peerStream)=>{
          dispatch(addPeerAction(peerId, peerStream));
        })
      });

      me.on('call', (call)=> {
        call.answer(stream);
        call.on("stream", (peerStream)=>{
          dispatch(addPeerAction(call.peer, peerStream));
        })
      })


    },[me, stream])

    console.log("pp", {peers})

    return (
    <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
