import express from "express";
import { addAddress, getUserInfo, login, register, updateAddress } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
import { orderDetails, placeOrder } from "../controllers/orderController";
import { products } from "../controllers/productController";

export const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/info",authMiddleware,getUserInfo);
userRouter.post("/updateaddress",authMiddleware,updateAddress);
userRouter.post("/addaddress",authMiddleware,addAddress);







