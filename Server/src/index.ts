import express from "express";
import http from "http";
import {Server} from "socket.io"
import cors from "cors"
import { roomHandler } from "./room";

const port = 8080;
const app = express();
app.use(cors);
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET","POST"],
    }
})


// First Connection
io.on("connection", (socket)=>{
    console.log("user is connected");

    roomHandler(socket);



    // On Disconnect
    socket.on("disconnect", ()=>{
        console.log("user is disconnected");
    })
})

server.listen(port, ()=> {
    console.log(`Listining to the server on ${port}`)
})