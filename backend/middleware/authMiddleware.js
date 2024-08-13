import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";



export const protect = asyncHandler(async(req,res,next) =>{
   try{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    const user = await User.findOne({_id:decoded._id}).select("-password");
    if(!user){
        res.status(401).send("Not authorized");
        throw new Error();
    }
    req.user = user;
    next()
   }catch(e){
    res.status(401).send("Please authenticate");
   }
  
} );