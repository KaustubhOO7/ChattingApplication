import cors from "cors";
import express from "express";
import http from 'http';
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3006",
        methods: ["GET", "POST"]
    }
});

server.listen(3001, () => {
    console.log("Server is Running");
});

const users = new Set();
const socketUserMap = new Map();


io.on("connection", (socket) => {
    console.log("User is connected with ", socket.id);
    socket.on("send_message", (data) => {
        socket.broadcast.emit('receive_message', { message: data.message , sender : data.sender });
    });

    socket.on("spreadUsers", (data) => {
        const isNewUser = !users.has(data.message);
        users.add(data.message);
        socketUserMap.set(socket.id, data.message);
        if (isNewUser) {
          socket.broadcast.emit("newUser", { user: data.message });
        }
        io.emit("showUsers", { message: Array.from(users) });
      });

    socket.on("disconnected", (data) => {
        users.delete(data.exit);
        function valueToDelete(map,values) {
            for (const [key, value] of map) {
                if (value === values) {
                  map.delete(key);
                }
              }
        }
        valueToDelete(socketUserMap,data.exit);
        io.emit("showUsers", { message: Array.from(users) });
    });

    socket.on("disconnect", () => {
        const user = socketUserMap.get(socket.id);
        users.delete(user);
        socketUserMap.delete(socket.id);
        io.emit("showUsers", { message: Array.from(users) });
    } )
});

