const {signup,login,logout}=require("../controllers/user.controllers")
const {Router}=require("express");
const userRouter=Router()
const {authenticator}=require("../middlewares/Auth")


userRouter.post("/signup",signup);
userRouter.post("/login",login)
userRouter.get("/logout",authenticator,logout)


module.exports={userRouter}
