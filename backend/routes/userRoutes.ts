import express from "express";
import { addAddress, checkTrigram, getCustomers, getUserInfo, login, register, updateAddress, userTrigramLogin } from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";
import { orderDetails, placeOrder } from "../controllers/orderController";
import { products } from "../controllers/productController";

export const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/trigram",checkTrigram)
userRouter.post("/getcustomers",getCustomers);
userRouter.post("/trigramlogin",userTrigramLogin);
userRouter.post("/info",authMiddleware,getUserInfo);
userRouter.post("/updateaddress",authMiddleware,updateAddress);
userRouter.post("/addaddress",authMiddleware,addAddress);







