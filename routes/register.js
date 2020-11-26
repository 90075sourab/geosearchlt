const express=require("express");
const router=express.Router();
const controller=require("../controller/root");
router.get("/",(req,res)=>{
    res.render("register");
})

router.post("/",controller.register.registerValidate,controller.register.register);

module.exports=router;