import express from "express";
import { a_AddAddress, a_GetUserInfo, a_Login, a_OrderDetails, a_PlaceOrder, a_Products, a_Register, a_UpdateAddress } from "../controllers/aController";
import { authMiddleware } from "../middleware/auth";

export const aRouter = express.Router();

aRouter.post("/register",a_Register);
aRouter.post("/login",a_Login);
aRouter.post("/userinfo",authMiddleware,a_GetUserInfo);
aRouter.post("/updateaddress",authMiddleware,a_UpdateAddress);
aRouter.post("/addaddress",authMiddleware,a_AddAddress);
aRouter.post("/orders",authMiddleware,a_OrderDetails);
aRouter.post("/products",authMiddleware,a_Products);
aRouter.post("/placeorder",authMiddleware,a_PlaceOrder);






