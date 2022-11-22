import express from "express";
import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express();



router.post('/register', registerUser)
router.post('/login', loginUser)
export default router;