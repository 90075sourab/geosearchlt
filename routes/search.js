const express=require("express");
const router=express.Router();
const registerModel=require("../models/register")
const controller=require("../controller/root")

router.get("/",(req,res)=>{
   
   console.log("get esrach")
   res.render("search",{searchData:[]});
})


router.post("/",controller.search.searchValidate,controller.search.search)

module.exports=router;