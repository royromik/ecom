import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();


const protect = async(req,res,next) =>{
   try{
    
    next()
   }catch(error){
    next(error);
   }
  
} 

export default protect