import {Router} from "express";
import { orderDetails } from "../controllers/orderController";
import { authMiddleware } from "../middleware/auth";
import { placeOrder } from "../controllers/orderController";
import { products } from "../controllers/productController";

export const orderRouter = Router();

orderRouter.post("/list",authMiddleware,orderDetails);

orderRouter.post("/book",authMiddleware,placeOrder);