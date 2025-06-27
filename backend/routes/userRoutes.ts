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

// import express from "express";
// import {
//   addAddress,
//   checkTrigram,
//   getCustomers,
//   getUserInfo,
//   login,
//   register,
//   updateAddress,
//   userTrigramLogin
// } from "../controllers/userController";
// import { authMiddleware } from "../middleware/auth";
// import { orderDetails, placeOrder } from "../controllers/orderController";
// import { products } from "../controllers/productController";

// export const userRouter = express.Router();

// userRouter.post("/register", register);
// userRouter.post("/login", login);
// userRouter.post("/trigram", checkTrigram);
// userRouter.post("/getcustomers", getCustomers);
// userRouter.post("/trigramlogin", userTrigramLogin);
// userRouter.post("/info", authMiddleware, getUserInfo);
// userRouter.post("/updateaddress", authMiddleware, updateAddress);
// userRouter.post("/addaddress", authMiddleware, addAddress); // ✅ This one


// import express from "express";
// import {
//   register,
//   login,
//   checkTrigram,
//   getCustomers,
//   userTrigramLogin,
//   getUserInfo,
//   addAddress,
//   updateAddress,
// } from "../controllers/userController";

// import { authMiddleware } from "../middleware/auth";
// import { placeOrder, orderDetails } from "../controllers/orderController";
// import { products } from "../controllers/productController";

// export const userRouter = express.Router();

// // ✅ PUBLIC ROUTES (No auth required)
// userRouter.post("/register", register);                    // /api/user/register
// userRouter.post("/login", login);                          // /api/user/login
// userRouter.post("/trigram", checkTrigram);                 // /api/user/trigram
// userRouter.post("/getcustomers", getCustomers);            // /api/user/getcustomers
// userRouter.post("/trigramlogin", userTrigramLogin);        // /api/user/trigramlogin

// // ✅ PROTECTED ROUTES (Auth token required)
// userRouter.post("/info", authMiddleware, getUserInfo);     // /api/user/info
// userRouter.post("/addaddress", authMiddleware, addAddress);// /api/user/addaddress
// userRouter.post("/updateaddress", authMiddleware, updateAddress); // /api/user/updateaddress

// // You can add more protected routes like order placing, etc. as needed
// // Example:
// // userRouter.post("/order", authMiddleware, placeOrder);
// // userRouter.get("/products", authMiddleware, products);







