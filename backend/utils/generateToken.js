import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id) => {
    const token = jwt.sign({_id:id},process.env.SECRET_KEY,{expiresIn:"1d"});
    return token
}