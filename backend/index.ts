import express from "express";
import connectDB from "./db/connect";
import authrouter from "./routes/authRoute";
import dotenv from "dotenv";
import { Server } from "socket.io";
import Message from "./models/messsage";
import cors from 'cors';
import messageRoutes from "./routes/messages";
import { createServer } from "http";
import filerouter from "./routes/uploadRoute";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const activeUsers = new Set<string>();
const app = express();
const httpServer = createServer(app);

connectDB();

app.use(cors());

app.use(express.json()); // Parse JSON requests
app.use("/", authrouter);
app.use("/messages", messageRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/upload", filerouter);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {

    socket.on("userConnected", (username: string) => {
      console.log(`✅ ${username} joined`);
      activeUsers.add(username);

      // Broadcast to all clients
      io.emit("activeUsers", Array.from(activeUsers));
    });


    socket.on("sendMessage", async (data) => {
      const { user, message, file } = data;

      const newMessage = new Message({
        user: { id: user.id, username: user.username },
        message,
        file
      });

      await newMessage.save();
      io.emit("receiveMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);

      if ((socket as any).username) {
        activeUsers.delete((socket as any).username);
        io.emit("activeUsers", Array.from(activeUsers));
      }
  
      socket.on("setUsername", (username) => {
        (socket as any).username = username;
      });
    });
});


httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});