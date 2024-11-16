"use client";
import Join from "@/components/CreateButton";
import { RoomProvider } from "@/context/RoomContext";
import { useEffect } from "react";


export default function Home() {

  return (
    <div className="App flex items-center justify-center w-screen h-screen">
      <Join />
    </div>
  );
}
