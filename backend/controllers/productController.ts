import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const products = async (req:any,res:any)=>{
    const {company}=req.query;
    try
    {
       const response = await prisma.product.findMany({
          where:{
             company:company,
            
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
 

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export const products = async (req: any, res: any) => {
//   const { company } = req.query;

//   try {
//     const response = await prisma.product.findMany({
//       where: {
//         company: String(company), // ensure it's a string
//       },
//     });

//     res.status(200).json({ products: response });
//   } catch (err) {
//     console.error("Product fetch error:", err);
//     res.status(500).json({ msg: "error", error: err.message });
//   }
// };
