const jwt=require("jsonwebtoken")
require("dotenv").config()
const redisClient=require("../helpers/redis")


const authenticator= async (req,res,next)=>{
       try{
           const token=req.headers?.authorization?.split(" ")[1];

           if(!token) return res.status(400).send("Please login again");


           const isTokenValid=await jwt.verify(token,process.env.JWT_secret);

           if(!isTokenValid) return res.send("Please login again");

           const isTokenBlacklisted= await redisClient.get(token);

           if(isTokenBlacklisted) return res.send("Unauthorized");

           req.body.userId=isTokenValid.userId
           req.body.IP_address=isTokenValid.IP_address;

           next()
       }catch(err){
        res.send(err.message)
       }
}

module.exports={authenticator}