const express=require("express")
const {connection}=require("./config/db")
require("dotenv").config()
const {userRouter}=require("./routes/user.routes")
const redisClient = require("./helpers/redis")
const logger=require("./middlewares/logger")
const cityRouter=require("./routes/city.routes")

const app=express()
app.use(express.json())


app.get("/",async (req,res)=>{
    res.send(await redisClient.get("name"))
})

app.use("/api/user",userRouter)
app.use("/api/IP",cityRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Connected to MongoDB")
        logger.log("info","database connected.")
        console.log("server is running.") 
    }catch(err){
        console.log("Not able to connect to the MOngoDB")
        logger.log("error","database connection fail.")
        console.log(err)
    }
    
})