import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const products = async (req:any,res:any)=>{
    const {company}=req.query;
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
 
 