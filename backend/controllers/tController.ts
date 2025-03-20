import axios from "axios";
import jwt from "jsonwebtoken";
import { appScriptUrl } from "../lib/config";
const generateToken = (gstNo:string)=>{
    return jwt.sign({gstNo},"secret_t");
}

export const t_Register = async (req:any,res:any)=>{
    const {gstNo,name,password,email,contactno,trigram} = req.body;
    console.log(process.env.appScriptUrl)
    try{
        const response = await axios.post(appScriptUrl,{
            action:"register",
            gstin:gstNo,
            name,
            password,
            company:"T",
            trigram,
            email,
            contactno

        })
        if(!response.data.success)
        {
            return res.status(500).json({msg:response.data.message})
        }
        console.log(response.data)
        const token = generateToken(gstNo);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
    
}

export const t_Login=async(req:any,res:any)=>{
    const {gstNo,password} = req.body;
    console.log(process.env.appScriptUrl)
    try{
        const response = await axios.post(appScriptUrl,{
            action:"login",
            gstin:gstNo,
            password,
            company:"T",
        })
        if(!response.data.success)
        {
            return res.status(500).json({msg:response.data.message})
        }
        console.log(response.data)
        const token = generateToken(gstNo);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }

}

export const t_UserInfo=async(req:any,res:any)=>{
    const {gstNo} = req.body;
    
    try{
        const response = await axios.post(appScriptUrl,{
            action:"get_user_info",
            gstin:gstNo,
            company:"T",
        })
        if(!response.data.success)
        {
            return res.status(500).json({msg:response.data.message})
        }
        console.log(response.data)
        const response2=await axios.post(appScriptUrl,{
            action:"get_address",
            gstin:gstNo,
            company:"T",
        })
        console.log(response2.data)
        res.status(200).json({user:response.data.user,address:response2.data.addresses});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const t_AddAddress=async(req:any,res:any)=>{
    const {gstNo,type,billingAddress,shippingAddress,phone,contactName} = req.body;
    try{
        const response = await axios.post(appScriptUrl,{
            action:"add_address",
            gstin:gstNo,
            type,
            billingAddress,
            shippingAddress,
            phone,
            contactName,
            company:"T",
        })
        if(!response.data.success)
        {
            return res.status(500).json({msg:response.data.message})
        }
        console.log(response.data)
        res.status(200).json({msg:"Address added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const t_UpdateAddress=async(req:any,res:any)=>{
    const {gstNo,type,billingAddress,shippingAddress,phone,contactName} = req.body;
    try{
        const response = await axios.post(appScriptUrl,{
            action:"update_address",
            gstin:gstNo,
            type,
            billingAddress,
            shippingAddress,
            phone,
            contactName,
            company:"T",
        })
        if(!response.data.success)
        {
            return res.status(500).json({msg:response.data.message})
        }
        console.log(response.data)
        res.status(200).json({msg:"Address updated successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}