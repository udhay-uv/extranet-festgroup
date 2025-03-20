import axios from "axios";
import jwt from "jsonwebtoken";
import { appScriptUrl } from "../lib/config";
const generateToken = (gstNo:string)=>{
    return jwt.sign({gstNo},"secret_s");
}

export const s_Register = async (req:any,res:any)=>{
    const {gstNo,name,password,email,contactno,trigram} = req.body;
    console.log(process.env.appScriptUrl)
    try{
        const response = await axios.post(appScriptUrl,{
            action:"register",
            gstin:gstNo,
            name,
            password,
            company:"S",
            email,
            contactno,
            trigram,
        })
        if(!response.data.success){
            return res.status(500).json({msg:response.data.message});
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

export const s_Login=async(req:any,res:any)=>{
    const {gstNo,password} = req.body;
    console.log(process.env.appScriptUrl)
    try{
        const response = await axios.post(appScriptUrl,{
            action:"login",
            gstin:gstNo,
            password,
            company:"S",
        })
        if(!response.data.success){
            return res.status(500).json({msg:response.data.message});
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

export const s_GetUserInfo = async (req:any,res:any)=>{
    const {  gstNo } = req.body;
    console.log(req.body)
    try{    
        const response = await axios.post(appScriptUrl,{
            action:"get_user_info",
            gstin:gstNo,
            company:"S",
        })
        if(!response.data.success){
            return res.status(500).json({msg:response.data.message});
        }
        const response2=await axios.post(appScriptUrl,{
            action:"get_address",
            gstin:gstNo,
            company:"S",
        })
        console.log(response2.data)
        res.status(200).json({user: response.data.user,address:response2.data.addresses,check:"hello"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }



}

export const s_AddAddress = async (req:any,res:any)=>{
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
            company:"S",
        })
        if(!response.data.success){
            return res.status(500).json({msg:response.data.message});
        }
        res.status(200).json({msg:"Address added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }   
}

export const s_UpdateAddress = async (req:any,res:any)=>{
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
            company:"S",
        })
        if(!response.data.success){
            return res.status(500).json({msg:response.data.message});
        }
        res.status(200).json({msg:"Address updated successfully"});     
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}



