const express=require("express");
const router=express.Router();
const controller=require("../controller/root");
const registerModel=require("../models/register")
router.get("/",async (req,res)=>{
    try{
    searchData=await registerModel.find();
    res.render("record",{searchData});
    }catch(e){
        res.status(400).send("error")
    }
})



module.exports=router;