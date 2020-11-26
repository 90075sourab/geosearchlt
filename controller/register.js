const registerModel=require("../models/register")
const { body, validationResult } = require('express-validator');

module.exports.registerValidate=[
   body("username").not().isEmpty().withMessage("Name Field Empty")
   .isLength({min:3}).withMessage("Name Should atleats 3 character")
   .isLength({max:20}).withMessage("Name Should maximum 20 character").trim().escape(),
   body("userlat").not().isEmpty().withMessage("We not Getting Your Location")
   .isFloat({min:-90,max:90}).withMessage("latitude format incorrect"),
   body("userlong").not().isEmpty().withMessage("We not Getting Your Location")
   .isFloat({min:-180,max:180}).withMessage("longitude format incorrect")

]

module.exports.register=async (req,res)=>{
  /* postedData={
       name:req.body.username,
       location.coordinates:[req.body.username],
   }
   */

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     console.log(errors.mapped())
     res.json({registerError:errors.mapped()})
     
  }else{

  newRegister=new registerModel({name:req.body.username})

  //console.log(newRegister);
  

  //console.log(req.body);

  //first param is longitude second is latitude
  newRegister.setLocation(req.body.userlong,req.body.userlat)

   try{
      data=await newRegister.save();
       res.json({success:"Successfuly registered"});
       console.log("saved",data)
    }catch(e){
       console.log(e);
       res.status(400).send("can not save");
    }

  }
   //console.log(newRegister);
    
   
}