import express, { Request } from "express"
import cors from "cors"
import  {aRouter} from "./routes/aRoutes"
import jwt from "jsonwebtoken";
import { tRouter } from "./routes/tRoutes";
import { sRouter } from "./routes/sRoutes";
import moment from "moment-timezone";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express();

app.use(express.json())
app.use(cors())

app.use("/api/a",aRouter)
app.use("/api/t",tRouter)
app.use("/api/s",sRouter)


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
    const gstin="07AUMPA9482A1ZO";
    const istNow = moment().tz("Asia/Kolkata");
    const orderDate = istNow.format("YYYY-MM-DD");
    const orderTime = istNow.format("HH:mm:ss");   
    const order = await prisma.a_Order.create({
      data: {
        orderNo: 'ORD-1001',
        gstin,
        billingAddressId: 4,
        shippingAddressId: 6,
        timeStamp: orderTime,
        orderDate: orderDate,
        totalPrice: 250000,
        status: 0,
        paymentFile: null,
        vehicleRegNo: null,
      },
    });

    console.log('✅ Order Created:', order);

    // Insert Order Details for the Ord
    const cgst=6;
    const sgst=6;
    const netPrice1=100000;
    const netPrice2=150000;
    const totalAmount1=netPrice1+netPrice1*cgst/100+netPrice1*sgst/100;
    const totalAmount2=netPrice2+netPrice2*cgst/100+netPrice2*sgst/100;
    const orderDetails = await prisma.a_OrderDetails.createMany({
      data: [
        {
          orderId: order.orderNo,
          modelNumber: 'SUN-5K-G03',
          quantity: 2,
          unitPrice: 50000,
          netPrice:netPrice1,
          cgst,
          sgst,
          totalAmount:totalAmount1,
        },
        {
          orderId: order.orderNo,
          modelNumber: 'SUN-10K-G03',
          quantity: 1,
          unitPrice: 150000,
          netPrice:netPrice2,
          cgst,
          sgst,
          totalAmount:totalAmount2,
        },
      ],
    });

      return res.json({message:"Done"})
    
        
})