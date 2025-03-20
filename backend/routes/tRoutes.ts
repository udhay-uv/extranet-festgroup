
import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken"; 
import { t_AddAddress, t_Register, t_UpdateAddress, t_UserInfo } from "../controllers/tController";
import { t_Login } from "../controllers/tController";
import { authMiddleware } from "../middleware/auth";

export const tRouter = express.Router();

tRouter.post("/register",t_Register);
tRouter.post("/login",t_Login);
tRouter.post("/userinfo",authMiddleware,t_UserInfo);
tRouter.post("/addaddress",authMiddleware,t_AddAddress);
tRouter.post("/updateaddress",authMiddleware,t_UpdateAddress);

        