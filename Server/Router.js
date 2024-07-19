import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createUser, checkdetails } from "./Database.js";
import { Server } from "socket.io";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Connected to Port ${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "https://chat-application-frontend-ivory.vercel.app",
        methods: ["GET", "POST"]
    }
});


//Socket IO Code ------------------------------------------------------------------------

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


//Server Code---------------------------------------------------------------------------

app.get("/",(req,res) => {
  res.json("Hello");
})

app.post("/check", async (req, res) => {
  
  const { email,password} = req.body;
  const check = await checkdetails(email,password);

  if (check !== 'user not exist') {
    return res.status(200).json({ message: check });
  }
  if(check === 'wrong email or password'){
    return res.status(200).json({ message : check});
  }
  return res.status(200).json({ message: check });

});

app.post("/create", async (req, res) => {
  
  const { firstName, lastName, email, password } = req.body;
  const create = await createUser(firstName, lastName, email, password);

  if (create === "saved") {
    return res.status(200).json({ message: "User Created Successfully" });
  }
  if (create === "user exist") {
    return res.status(200).json({ message: "user exist" });
  } 
  else {
    return res.status(401).json({ message: "Error" });
  }

});
