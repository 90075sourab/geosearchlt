const NodeGeocoder = require('node-geocoder');
const { body, validationResult } = require('express-validator');
const registerModel=require("../models/register");
const e = require('express');
const options = {
    provider: 'openstreetmap',
};
const geocoder = NodeGeocoder(options);

module.exports.searchValidate=[
    body('s_name').isLength({min:3}).withMessage("atleast 3 chareter required")
    .custom(function(value){
        var patt = /^[a-zA-Z1-9\s]+$/;
        return patt.test(value);
        

    }).withMessage("Should be Alphabate")
    .isLength({max:20}).withMessage("Maximum 20 character required").escape().trim(),

     body('s_location').isLength({min:3}).withMessage("atleast 3 chareter required")
     .custom(function(value){
        var patt = /^[a-zA-Z1-9\s]+$/;
        return patt.test(value);
        

    }).withMessage("Should be Alphabate")
    .isLength({max:50}).withMessage("Maximum 20 character required").escape().trim()

]
module.exports.search=async function(req,res){
    const mindist=10000
    const maxdist=500000

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       console.log(errors.mapped())
       res.render("search",{searchField:req.body,searchError:errors.mapped(),searchData:[]})
    }else{

    const loc=await geocoder.geocode(req.body.s_location.trim())
    if(loc.length>0){

    //handle if no result found//
    //const loc_qry_array=create_Loc_Qry_Array(loc,10000,5000000)
     //first location used here form locations array
    const  searchLon=loc[0].longitude
    const  searchLat=loc[0].latitude

    console.log(searchLon,searchLat)
 

    //create query object//
    const queryObject={
        $and:[
            
            {
                location:{
                $near:{
                    $geometry: {
                    type: "Point" ,
                    coordinates: [searchLon,searchLat ]
                        },
                        $minDistance: 10000,
                        $maxDistance: 5000000
                     }
                   }
                },
                {
                    name:{ $regex:new RegExp(req.body.s_name,'i')}
                }
        ]
    }
        
        
    
    //console.log(queryObject);


    try{
      searchData= await registerModel.find(queryObject)
      if(searchData!=null)
       res.render("search",{searchField:req.body,searchData:searchData})
    }catch(e){
        console.log(e);
        res.status(400).send("error occured")

    }
  }else{
     res.render("search",{searchField:req.body,searchData:[]})
  }
    
}
     
    
    
}

