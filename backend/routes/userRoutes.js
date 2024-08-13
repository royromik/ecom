import express from "express";
import { userLogin, userProfile,registerUser,updateUserProfile} from "../controller/userController.js";
import {protect} from "../middleware/authMiddleware.js"


const router = express.Router();


//login user and generate token

router.post("/login",userLogin);
router.get("/profile", protect, userProfile).put("/profile",protect,updateUserProfile);
router.post("/register",registerUser);

export default router;