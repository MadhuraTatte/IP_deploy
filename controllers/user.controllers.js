const {user}=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const redisClient = require("../helpers/redis")
require("dotenv").config()


const signup = async (req,res)=>{
    try{
        const {name,email,password,IP_address}=req.body;
        const isUserPresent=await user.findOne({email});
        if(isUserPresent) return res.send("User is already present,Please login.");
        
        
        const hash=await bcrypt.hash(password,6);
        const newUser=new user({name,email,password:hash,IP_address});

        await newUser.save();
        res.send("SignUp successful");
    }catch(err){
        res.send(err.message)
    }
}

const logout = async (req,res)=>{
    try{
        const token =req.headers?.authorization?.split(" ")[1]
        if(!token) return res.status(400)

        await redisClient.set(token,token)
        res.send("logout successful");

    }catch(err){
        res.send(err.message)
    }
}


const login=async(req,res)=>{
    try{
         const {email,password}=req.body;
         const isUserPresent=await user.findOne({email});
         if(!isUserPresent){
            return res.send("User is not present,please signUp");
         }

         const isPasswordCorrect=await bcrypt.compare(password,isUserPresent.password);

         if(!isPasswordCorrect){
            return res.send("Invalid Credential,please login again");

         }

         const token=await jwt.sign({userId:isUserPresent._id,IP_address:isUserPresent.IP_address},process.env.JWT_secret,{expiresIn:"1hr"})
         res.send({message:"Login Successful",token});
    }catch(err){
        res.send(err.message)
    }
}

module.exports={
    signup,login,logout
}