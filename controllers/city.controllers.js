const redisClient=require("../helpers/redis")
const axios=require("axios");
const citiesList=require("../models/city.model")
const {user}=require("../models/user.model");


const getData=async (req,res)=>{
    try{
        const IP=req.params.IP || req.body.IP_address;

        const isIPinCache= await redisClient.get(`${IP}`);

        if(isIPinCache) return res.status(200).send({data:isIPinCache});

        const response=await axios.get(`https://ipapi.co/${IP}/json/`)

        const IPdata=response.data;

        redisClient.set(IP,JSON.stringify(IPdata),{EX:21600});

         await citiesList.findOneAndUpdate({userId:req.body.userId},{
            userId:req.body.userId,$push:{previousSearches:IP}
         },{new:true,upsert:true,setDefaultsOnInsert:true})

         return res.send({data:IPdata});

    }catch(err){
        res.send(err.message)
    }
}


module.exports=getData;