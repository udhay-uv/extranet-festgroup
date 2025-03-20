import express, { Request } from "express"
import cors from "cors"
import  { userRouter} from "./routes/userRoutes"
import jwt from "jsonwebtoken";

import moment from "moment-timezone";
import { PrismaClient } from "@prisma/client";
import { productRouter } from "./routes/productRoutes";
import { orderRouter } from "./routes/orderRoutes";
const prisma = new PrismaClient();

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/user",userRouter)
app.use("/api/order",orderRouter)
app.use("/api/product",productRouter)


const BACKEND_PORT = 3000;


app.listen(BACKEND_PORT,()=>{
    console.log("Running" +BACKEND_PORT)
})


app.get("/check",(req,res:any)=>{
    return res.json({message:"Running"})
})

