import express from "express";
import Message from "../models/messsage";

const messageRoutes = express.Router();

// GET /api/messages
messageRoutes.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(50).lean();
    res.json(messages.reverse()); // reverse to show oldest first
  } catch (err) {
    res.status(500).json({ message: "Failed to load messages" });
  }
});

export default messageRoutes;
