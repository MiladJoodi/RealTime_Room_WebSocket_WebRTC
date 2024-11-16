"use client"
import { useContext, useEffect } from "react";
import { RoomContext } from "@/context/RoomContext";
// import VideoPlayer from "@/components/VideoPlayer";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { ws } = useContext(RoomContext);

  useEffect(() => {
  ws.emit("join-room", { roomId:id});
  }, [id, ws]);

  return (
    <div>
      <h1>Enter</h1>
      <p>ID: {id}</p>
      <div>
        {/* <VideoPlayer stream={stream} /> */}
      </div>
    </div>

  );
};

export default Page;
