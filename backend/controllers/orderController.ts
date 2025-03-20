import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import moment from "moment-timezone";
export const orderDetails = async (req:any,res:any)=>{
    const {gstNo} = req.body;
    const company = req.query.company;
    console.log(req.body)
    try{
        let response;
        if(company==='a'){
            response = await prisma.a_Order.findMany({
                where:{
                    gstin:gstNo,
                },
            include:{
                orderDetails:true,
                    billingAddress:true,
                    shippingAddress:true,
                }
            })      
        }
        else if(company==='s'){
            response = await prisma.s_Order.findMany({
                where:{
                    gstin:gstNo,
                },
            include:{
                orderDetails:true,
                    billingAddress:true,
                    shippingAddress:true,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_Order.findMany({
                where:{
                    gstin:gstNo,
                },
            include:{
                orderDetails:true,
                    billingAddress:true,
                    shippingAddress:true,
                }
            })
        }
        console.log(response)
        res.status(200).json({orders: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}


export const placeOrder = async (req:any,res:any)=>{
    console.log(req.body)
    const istNow = moment().tz("Asia/Kolkata");
    const orderDate = istNow.format("YYYY-MM-DD");
    const orderTime = istNow.format("HH:mm:ss");  
    const company=req.query.company;
    try {
        let response;
        if(company==='a'){
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
        }
        else if(company==='s'){
            await prisma.$transaction(async (tx) => {
                const lastOrderNo=await tx.s_Order.findFirst({
                    orderBy:{
                        id:"desc",
                    },
                })
                let newOrderNo='ORD-1001';
                if(lastOrderNo){
                    const lastOrderNoInt=parseInt(lastOrderNo.orderNo.split("-")[1]);
                    newOrderNo=`ORD-${lastOrderNoInt+1}`;
                }
                
                const order = await tx.s_Order.create({
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
                    await tx.s_OrderDetails.create({
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
        }
        else if(company==='t'){
            await prisma.$transaction(async (tx) => {
                const lastOrderNo=await tx.t_Order.findFirst({
                    orderBy:{
                        id:"desc",
                    },
                })
                let newOrderNo='ORD-1001';
                if(lastOrderNo){
                    const lastOrderNoInt=parseInt(lastOrderNo.orderNo.split("-")[1]);
                    newOrderNo=`ORD-${lastOrderNoInt+1}`;
                }
                
                const order = await tx.t_Order.create({
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
                    await tx.t_OrderDetails.create({
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
        }
        res.status(200).json({msg:"Order placed successfully"});
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

