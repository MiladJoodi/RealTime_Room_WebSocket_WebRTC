import { RoomContext } from "@/context/RoomContext";
import { useContext } from "react";

const Join: React.FC = () => {
  const { ws } = useContext(RoomContext);

  const createRoom = ()=>{
    ws.emit("create-room");
  }

  return (
    <button onClick={createRoom} className="bg-rose-400 text-white py-2 px-8 rounded-lg text-xl hover:bg-rose-600">
      Start new meeting
    </button>
  );
};

export default Join;
