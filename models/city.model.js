const mongoose=require("mongoose");
const cities=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    previousSearches:[{type:String,required:true}]
})

const citiesList=mongoose.model("cities",cities)

module.exports=citiesList;