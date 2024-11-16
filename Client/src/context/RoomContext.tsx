"use client";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect } from "react";
import socketIOClient from "socket.io-client";
const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  
  const router = useRouter();
  
    const enterRoom = ({roomId}: {roomId: "string"})=> {
        console.log({roomId})
        router.push(`/room/${roomId}`);
    }


    useEffect(()=>{
        ws.on("room-created", enterRoom)
    }, [])
    return (
    <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>
  );
};
