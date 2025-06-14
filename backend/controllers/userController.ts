import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const generateToken = (gstNo:string,company:string)=>{
    return jwt.sign({gstNo},company+"_secret");
}


export const register = async (req:any,res:any)=>{
    const {gstNo,name,password,email,contactno,trigram} = req.body;
    const company = req.query.company;
    try{
        let response;
        if(company==='a'){
            response = await prisma.a_User.create({
                data:{
                    gstin:gstNo,
                    name,
                    password,
                    email,
                contactNo:contactno,
                sales:trigram
            }
        })
        }
        else if(company==='s'){
            response = await prisma.s_User.create({
                data:{
                    gstin:gstNo,
                    name,
                    password,
                    email,
                    contactNo:contactno,
                    sales:trigram
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_User.create({
                data:{
                    gstin:gstNo,
                    name,
                    password,
                    email,
                    contactNo:contactno,
                    sales:trigram
                }
            })
        }
        console.log(response)
        const token = generateToken(response?.gstin || "",company);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const login = async (req:any,res:any)=>{
    const {gstNo,password} = req.body;
    const company = req.query.company;
    console.log(gstNo+" "+password)
    console.log(company)
    try{
        let response;
        if(company==='a'){
            response = await prisma.a_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='s'){
            response = await prisma.s_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        console.log(response)
        const token = generateToken(response?.gstin || "",company);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
    
}

export const checkTrigram = async (req:any,res:any)=>{
    const {trigram} = req.body;
    const company = req.query.company;
    try{
        let response;
        if(company==='a'){
            response = await prisma.a_User.findMany({
                where:{
                    sales:trigram,
                }
            })
        }
        else if(company==='s'){
            response = await prisma.s_User.findMany({
                where:{
                    sales:trigram,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_User.findMany({
                where:{
                    sales:trigram,
                }
            })
        }
        if(response && response.length===0){
            return res.status(500).json({msg:"No user found"});
        }

        res.status(200).json({response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const userTrigramLogin = async (req:any,res:any)=>{
    try{
        const {gstNo} = req.body;
        const company = req.query.company;
        let response;
        if(company==='a'){
            response = await prisma.a_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='s'){
            response = await prisma.s_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        console.log(response)
        const token = generateToken(response?.gstin || "",company);
        res.status(200).json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const getCustomers = async (req:any,res:any)=>{
    try{
        const {trigram} = req.body;

        const company = req.query.company;
        let response;
        if(company==='a'){
            response = await prisma.a_User.findMany({
                where:{
                    sales:trigram,
                }
            })
        }
        else if(company==='s'){
            response = await prisma.s_User.findMany({
                where:{
                    sales:trigram,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_User.findMany({
                where:{
                    sales:trigram,
                }
            })
        }
        console.log(response)
        res.status(200).json({response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const getUserInfo = async (req:any,res:any)=>{
    const {gstNo} = req.body;
    const company = req.query.company;
    console.log(req.body)
    try{
        let response;
        let response2;
        if(company==='a'){
            response = await prisma.a_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='s'){
            response = await prisma.s_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_User.findUnique({
                where:{
                    gstin:gstNo,
                }
            })
        }
        console.log(response)
        if(company==='a'){
            response2=await prisma.a_Address.findMany({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='s'){
            response2=await prisma.s_Address.findMany({
                where:{
                    gstin:gstNo,
                }
            })
        }
        else if(company==='t'){
            response2=await prisma.t_Address.findMany({
                where:{
                    gstin:gstNo,
                }
            })
        }
        console.log(response2)
        res.status(200).json({user: response,address:response2});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}


export const addAddress = async (req:any,res:any)=>{
    const {gstNo,bs,type,address,phone,contactName} = req.body;
    const company = req.query.company;
    try{
        let response;
        if(company==='a'){
            response = await prisma.a_Address.create({
                data:{
                    gstin:gstNo,
                    bs:bs,
                    type:type,
                    address :address,
                    phone :phone,
                contactName :contactName,
                
            }
        })
        }
        else if(company==='s'){
            response = await prisma.s_Address.create({
                data:{
                    gstin:gstNo,
                    bs:bs,
                    type:type,
                    address :address,
                    phone :phone,
                    contactName :contactName,
                }
            })
        }
        else if(company==='t'){
            response = await prisma.t_Address.create({
                data:{
                    gstin:gstNo,
                    bs:bs,
                    type:type,
                    address :address,
                    phone :phone,
                    contactName :contactName,
                }
            })
        }
        console.log(response)
        res.status(200).json({msg:"Address added successfully",address:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}

export const updateAddress = async (req:any,res:any)=>{
    console.log(req.body)
    const {gstNo,bs,type,address,phone,contactName,id} = req.body;
    const company = req.query.company;

    try{
        let response;
        if(company==='a'){
            response = await prisma.a_Address.update({
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
        }
        else if(company==='s'){
            response = await prisma.s_Address.update({
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
        }
        else if(company==='t'){
            response = await prisma.t_Address.update({
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
        }
        console.log(response)
        res.status(200).json({msg:"Address updated successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"error"});
    }
}


