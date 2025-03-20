import axios from "axios";
import express from "express";
import jwt from "jsonwebtoken";
import { s_AddAddress, s_GetUserInfo, s_Login, s_UpdateAddress } from "../controllers/sController";
import { s_Register } from "../controllers/sController";
import { authMiddleware } from "../middleware/auth";

export const sRouter = express.Router();

sRouter.post("/register",s_Register);
sRouter.post("/login",s_Login);
sRouter.post("/userinfo",authMiddleware,s_GetUserInfo);
sRouter.post("/addaddress",authMiddleware,s_AddAddress);
sRouter.post("/updateaddress",authMiddleware,s_UpdateAddress);

