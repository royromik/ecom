import express from "express";
import { userLogin} from "../controller/userController.js";


const router = express.Router();


// get user by id 

router.post("/login",userLogin)


export default router;