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
    return res.json({message:"Hello"})
})

app.get("/check2",(req,res:any)=>{

    const istNow = moment().tz("Asia/Kolkata");
  
    const orderDate = istNow.format("YYYY-MM-DD");
    const orderTime = istNow.format("HH:mm:ss");   

    return res.json({orderDate,orderTime})
})

const usersData = [
    { gstin: "07AAACN2427K1ZJ", password: "laFraise", name: "Reliance Industries LP", companyName: "T", sales: "GCP", email: "test1@gmail.com", contactNo: "1234567891" },
    { gstin: "07AGJPA0894M1Z5", password: "laFraise", name: "Infosys Private Limited", companyName: "A", sales: "ARE", email: "test2@gmail.com", contactNo: "1234567892" },
    { gstin: "06AACCO8878P1ZH", password: "laFraise", name: "Tata Consultancy Services LLP", companyName: "A", sales: "ETT", email: "test3@gmail.com", contactNo: "1234567893" },
    { gstin: "07AUMPA9482A1ZO", password: "laFraise", name: "Wipro Technologies Pvt Ltd", companyName: "A", sales: "LEK", email: "test4@gmail.com", contactNo: "1234567894" },
    { gstin: "05AAACR5364D1ZO", password: "laFraise", name: "Mahindra & Mahindra Limited", companyName: "A", sales: "JAN", email: "test5@gmail.com", contactNo: "1234567895" },
    { gstin: "04AADCF3803C1ZD", password: "laFraise", name: "Adani Enterprises LLP", companyName: "A", sales: "KOR", email: "test6@gmail.com", contactNo: "1234567896" },
    { gstin: "07AALPK9184G1Z9", password: "laFraise", name: "Larsen & Toubro Ltd", companyName: "A", sales: "NAM", email: "test7@gmail.com", contactNo: "1234567897" },
    { gstin: "07AAACQ8419J1Z6", password: "laFraise", name: "HCL Technologies Pvt Ltd", companyName: "A", sales: "IKJ", email: "test8@gmail.com", contactNo: "1234567898" },
    { gstin: "07AAACQ9693G1ZZ", password: "laFraise", name: "Godrej Industries LP", companyName: "A", sales: "GCP", email: "test9@gmail.com", contactNo: "1234567899" },
    { gstin: "07AAACN2427K1ZJ", password: "leCurry", name: "Bajaj Finserv Limited", companyName: "S", sales: "ETT", email: "test10@gmail.com", contactNo: "1234567890" },
    { gstin: "10UVWXY9876T5Z1", password: "123random", name: "Marico LLP", companyName: "S", sales: "DDD", email: "test21@gmail.com", contactNo: "5656457777" },
    { gstin: "39ZXYWV6543U1Z7", password: "123random", name: "Dr. Reddy's Laboratories Pvt Ltd", companyName: "T", sales: "UUU", email: "test40@gmail.com", contactNo: "2323232323" }
  ];


  app.get("/check3",async(req,res:any)=>{
    



  try {
    // Creating multiple orders for the given user
    const orders = await prisma.s_Order.createMany({
      data: [
        {
          orderNo: 'ORD-5001',
          gstin: '07AAACN2427K1ZJ',
          billingAddressId: 1, // Change to an actual Address ID
          shippingAddressId: 2, // Change to an actual Address ID
          timeStamp: '10:30:00',
          orderDate: '2024-03-01',
          totalPrice: 75000,
          status: 2, // Proof Payment Upload
          paymentFile: 'proof_5001.pdf',
          vehicleRegNo: null
        },
        {
          orderNo: 'ORD-5002',
          gstin: '07AAACN2427K1ZJ',
          billingAddressId: 1,
          shippingAddressId: 2,
          timeStamp: '12:15:00',
          orderDate: '2024-03-02',
          totalPrice: 95000,
          status: 4, // Payment Received
          paymentFile: 'proof_5002.pdf',
          vehicleRegNo: null
        },
        {
          orderNo: 'ORD-5003',
          gstin: '07AAACN2427K1ZJ',
          billingAddressId: 1,
          shippingAddressId: 2,
          timeStamp: '15:45:00',
          orderDate: '2024-03-03',
          totalPrice: 125000,
          status: 6, // Vehicle Registration Uploaded
          paymentFile: 'proof_5003.pdf',
          vehicleRegNo: 'MH12AB1234'
        },
        {
          orderNo: 'ORD-5004',
          gstin: '07AAACN2427K1ZJ',
          billingAddressId: 1,
          shippingAddressId: 2,
          timeStamp: '17:20:00',
          orderDate: '2024-03-04',
          totalPrice: 180000,
          status: 8, // Order Ready to Ship
          paymentFile: 'proof_5004.pdf',
          vehicleRegNo: 'DL10XYZ5678'
        },
        {
          orderNo: 'ORD-5005',
          gstin: '07AAACN2427K1ZJ',
          billingAddressId: 1,
          shippingAddressId: 2,
          timeStamp: '19:10:00',
          orderDate: '2024-03-05',
          totalPrice: 220000,
          status: 10, // Order Shipped
          paymentFile: 'proof_5005.pdf',
          vehicleRegNo: 'KA05MN7890'
        }
      ]
    });

    console.log('Orders inserted:', orders);

    // Creating multiple order details linked to the orders
    const orderDetails = await prisma.s_OrderDetails.createMany({
      data: [
        { orderId: 'ORD-5001', modelNumber: 'SUN-3K-G03', quantity: 2, unitPrice: 25000, netPrice: 50000, cgst: 2500, sgst: 2500, totalAmount: 55000 },
        { orderId: 'ORD-5002', modelNumber: 'SUN-5K-G03', quantity: 3, unitPrice: 30000, netPrice: 90000, cgst: 4500, sgst: 4500, totalAmount: 99000 },
        { orderId: 'ORD-5003', modelNumber: 'SUN-8K-G03', quantity: 1, unitPrice: 80000, netPrice: 80000, cgst: 4000, sgst: 4000, totalAmount: 88000 },
        { orderId: 'ORD-5004', modelNumber: 'SUN-10K-G03', quantity: 2, unitPrice: 90000, netPrice: 180000, cgst: 9000, sgst: 9000, totalAmount: 198000 },
        { orderId: 'ORD-5005', modelNumber: 'SUN-12K-G03', quantity: 2, unitPrice: 110000, netPrice: 220000, cgst: 11000, sgst: 11000, totalAmount: 242000 }
      ]
    });

    console.log('Order Details inserted:', orderDetails);
    
    return res.json({message:"Done"})
    
  } catch (error) {
    console.error('Error inserting orders:', error);
    return res.json({message:"Error"})
  }

    
        
})