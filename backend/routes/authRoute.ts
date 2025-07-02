import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);

export default authrouter;
