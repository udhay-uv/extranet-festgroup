import { Router } from "express";
import { products } from "../controllers/productController";
import { authMiddleware } from "../middleware/auth";    

export const productRouter = Router();

productRouter.post("/list",authMiddleware,products);

