import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";



//user login

export const userLogin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body; 
    const user = await User.findOne({email})

    if(!user){
     res.status(404).json({"message":"email does not exist"})
     throw new Error({"message":"email does not exist"})
    }

    const match = await user.matchPassword(password);
    if(!match){
        res.status(401).json({"message":"Wrong password"})
        throw new Error({"message":"Wrong password"})
    }
    
    res.json({
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
    
})

