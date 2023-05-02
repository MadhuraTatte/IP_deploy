const {Router}=require("express");
const cityRouter=Router();
const {authenticator}=require("../middlewares/Auth")
const getData=require("../controllers/city.controllers")

cityRouter.get("/:IP",authenticator,getData)

module.exports=cityRouter;