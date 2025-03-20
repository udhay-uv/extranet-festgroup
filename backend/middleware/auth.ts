import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req:any,res:any,next:any)=>{
    console.log(req.body);
    try{
        const token = req.body.token;
        const company=req.query.company;
        let decoded=jwt.verify(token,company+"_secret") as JwtPayload;
            
    console.log(decoded.gstNo);

    req.body.gstNo = decoded.gstNo;
    next();
    }
    catch(err){
        res.status(200).json({msg:"Unauthorized"});
    }
}