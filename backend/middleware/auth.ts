import jwt from "jsonwebtoken";

export const authMiddleware = (req:any,res:any,next:any)=>{
    console.log(req.body);
    try{
        const token = req.body.token;
        let decoded:any;
     
        console.log(token);
        if(req.body.company === "A"){
       
        decoded = jwt.verify(token,"secret_a")
        console.log(decoded);
    }
    else if(req.body.company === "S"){
        decoded = jwt.verify(token,"secret_s") 
    }
    else if(req.body.company === "T"){
        decoded = jwt.verify(token,"secret_t") 
    }
    else{
        return res.status(401).json({msg:"Unauthorized"});
    }
   
    console.log(decoded.gstNo);

    req.body.gstNo = decoded.gstNo;
    next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}