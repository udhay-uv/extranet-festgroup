import axios from "axios";
import jwt from "jsonwebtoken";
import { appScriptUrl } from "../lib/config";
import moment from "moment-timezone";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const generateToken = (gstNo:string)=>{
    return jwt.sign({gstNo},"secret_a");
}


export const a_Register = async (req:any,res:any)=>{
    const {gstNo,name,password,email,contactno,trigram} = req.body;
    console.log(process.env.appScriptUrl)
    try{
        const response = await prisma.a_User.create({
            data:{
                gstin:gstNo,
                name,
                password,
                email,
                contactNo:contactno,
                sales:trigram
            }
        })
        console.log(response)
        const token = generateToken(response.gstin);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const a_Login = async (req:any,res:any)=>{
    const {gstNo,password} = req.body;
    console.log(gstNo,password)
    console.log(process.env.appScriptUrl)
    try{
        const response = await prisma.a_User.findUnique({
            where:{
                gstin:gstNo,
            }
        })
    
        console.log(response)
        const token = generateToken(response?.gstin || "");
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
    
}

export const a_GetUserInfo = async (req:any,res:any)=>{
    const {gstNo} = req.body;
    console.log(req.body)
    try{
        const response = await prisma.a_User.findUnique({
            where:{
                gstin:gstNo,

            }
        })
       
        console.log(response)

        const response2=await prisma.a_Address.findMany({
            where:{
                gstin:gstNo,
            }
        })
        console.log(response2)
        res.status(200).json({user: response,address:response2});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}


export const a_AddAddress = async (req:any,res:any)=>{
    const {gstNo,bs,type,address,phone,contactName} = req.body;

    try{
        const response = await prisma.a_Address.create({
            data:{
                gstin:gstNo,
                bs:bs,
                type:type,
                address :address,
                phone :phone,
                contactName :contactName,
                
            }
        })
 
        console.log(response)
        res.status(200).json({msg:"Address added successfully",address:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const a_UpdateAddress = async (req:any,res:any)=>{
    console.log(req.body)
    const {gstNo,bs,type,address,phone,contactName,id} = req.body;

    try{
        const response = await prisma.a_Address.update({
            where:{
                id:id,
            },
            data:{
                bs:bs,
                type:type,
                address:address,
                phone:phone,
                contactName:contactName,
            }
        })
       
        console.log(response)
        res.status(200).json({msg:"Address updated successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}


export const a_OrderDetails = async (req:any,res:any)=>{
    const {gstNo} = req.body;
    console.log(req.body)
    try{
        const orders = await prisma.a_Order.findMany({
            where:{
                gstin:gstNo,
            },
            include:{
                orderDetails:true,
                billingAddress:true,
                shippingAddress:true,
            }
        })      
        console.log(orders)
        res.status(200).json({orders: orders});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}


export const a_Products = async (req:any,res:any)=>{
   const {company}=req.body;
   try
   {
      const response = await prisma.product.findMany({
         where:{
            company:company,
            quantity:{
               gt:0,
            }
         }
      })
     
      console.log(response)
      res.status(200).json({products:response});
   }
   catch(err){
      console.log(err);
      res.status(500).json({msg:"error"});
   }
}

export const a_PlaceOrder = async (req:any,res:any)=>{
    console.log(req.body)
    const istNow = moment().tz("Asia/Kolkata");
    const orderDate = istNow.format("YYYY-MM-DD");
    const orderTime = istNow.format("HH:mm:ss");  
    try {
        await prisma.$transaction(async (tx) => {
            const lastOrderNo=await tx.a_Order.findFirst({
                orderBy:{
                    id:"desc",
                },
            })
            //lastOrderNo= 'ORD-1001'
            let newOrderNo='ORD-1001';
            if(lastOrderNo){
                const lastOrderNoInt=parseInt(lastOrderNo.orderNo.split("-")[1]);
                newOrderNo=`ORD-${lastOrderNoInt+1}`;
            }
            
            const order = await tx.a_Order.create({
                data:{
                    gstin:req.body.gstNo,
                    orderNo:newOrderNo,
                    timeStamp:orderTime,
                    orderDate:orderDate,
                    totalPrice:req.body.totalPrice,
                    billingAddressId:req.body.billingAddressId,
                    shippingAddressId:req.body.shippingAddressId,
                    status:0,
                }
            })
            await Promise.all(req.body.products.map(async (product:any)=>{
                await tx.a_OrderDetails.create({
                    data:{
                        orderId:newOrderNo,
                        modelNumber:product.product.mn,
                        quantity:product.quantity,
                        unitPrice:product.unitPrice,
                        netPrice:product.unitPrice*product.quantity,
                        cgst:product.cgst,
                        sgst:product.sgst,
                        totalAmount:product.unitPrice*product.quantity+(product.unitPrice*product.quantity*product.cgst/100)+(product.unitPrice*product.quantity*product.sgst/100),
                    }
                })
            }))
        })
        res.status(200).json({msg:"Order placed successfully"});
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
