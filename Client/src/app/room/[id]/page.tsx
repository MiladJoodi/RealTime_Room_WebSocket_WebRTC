"use client"
import { useContext, useEffect } from "react";
import { RoomContext } from "@/context/RoomContext";
import { VideoPlayer } from "@/components/VideoPlayer";
import { PeerState } from "@/context/peerReducer";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { ws, me, stream, peers } = useContext(RoomContext);
  console.log("peers ", peers)

  useEffect(() => {
    if(me) ws.emit("join-room", { roomId:id, peerId: me._id  });

  }, [id, me, ws]);

  return (
    <div>
      <h1>Enter</h1>
      <p>ID: {id}</p>
      <div className="grid grid-cols-4 gap-4">

        <VideoPlayer stream={stream} />

        {Object.values(peers as PeerState).map((peer) =>(
        <VideoPlayer stream={peer.stream} />
          
        ))}


      </div>
    </div>
  );
};

export default Page;
