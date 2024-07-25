import express from "express";
import { login, logout, signUp } from "../controller/authcontroller.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
 