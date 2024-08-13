import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//user login

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "email does not exist" });
    throw new Error({ message: "email does not exist" });
  }

  const match = await user.matchPassword(password);
  if (!match) {
    res.status(401).json({ message: "Wrong password" });
    throw new Error({ message: "Wrong password" });
  }

  res.send({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

//get user profile
export const userProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.send({
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } else {
    res.status("400").send("Not logged in");
  }
});

//update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not Found");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
  
    const updatedUser = await user.save();
  
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  
});

//register user

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.send({
    _id: user._id,
    name: name,
    email: email,
    token: generateToken(user._id),
  });
});
