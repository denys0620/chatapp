import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageList from "../components/chatpage/MessageList";
import MessageInput from "../components/chatpage/MessageInput";
import ActiveUsers from "../components/chatpage/ActiveUsers";
import { fetchMessages } from "../hook/messages";
import api from "../provider";

const socket = io("http://localhost:5000");

interface Message {
  _id: string;
  user: { id: string; username: string };
  message: string;
  timestamp: string;
  file?: { fileUrl: string; fileName: string };
}

interface Props {
  user: { id: string; username: string };
}

const ChatPage: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);


  useEffect(() => {

  fetchMessages().then((data) => {
    setMessages(data);
  });

  socket.emit("userConnected", user.username);
  socket.emit("setUsername", user.username); // used for disconnect cleanup

  socket.on("receiveMessage", (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  });

  socket.on("activeUsers", (users: string[]) => {
    setActiveUsers(users);
  });

  return () => {
    socket.off("receiveMessage");
    socket.off("activeUsers");
  };
}, []);


  const handleSend = async (message: string, file?: File) => {
    let fileData;
    
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await api.post("/upload", formData); // axios call
          const { fileUrl, fileName } = res.data;
          fileData = { fileUrl, fileName };
          
        } catch (err) {
          console.error("Upload error:", err);
          return;
        }
      }

      if (message.trim() || fileData) {
        socket.emit("sendMessage", {
          user,
          message,
          file: fileData,
        });
      }
  };


  return (
    <div className="h-screen flex flex-row">
      <div className="flex flex-col flex-1">
        <div className="bg-blue-600 text-white px-4 py-2 text-xl font-bold">Chat App</div>
        <MessageList messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
      <ActiveUsers users={activeUsers} />
    </div>
  );
};

export default ChatPage; 