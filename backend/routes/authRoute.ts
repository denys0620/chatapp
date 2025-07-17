import express from "express";
import { registerUser, loginUser } from "../controllers/authController";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user";

const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);

authrouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authrouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const user = req.user as IUser;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.redirect(`http://localhost:5173/auth/google/callback?token=${token}&user=${JSON.stringify(user)}`);
  }
);

export default authrouter;
