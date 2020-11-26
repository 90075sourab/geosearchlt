const mongoose=require("mongoose");
const schema=mongoose.Schema;

const pointSchema = new mongoose.Schema({
  //remember sub document can be undefined
  //sub document default will not work / but working after
  //enum not working
    type: {
      type: String,
      default:'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
const registerSchema=new schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:pointSchema,
        index:'2dsphere',
        required:true,

        }
        
})

registerSchema.methods.setLocation=function(lon,lat){
  //to set sub doc properies follow bellow 
  //unless this will not work
this.location={
    coordinates:[lon,lat],
}

}

module.exports=mongoose.model('regiter',registerSchema,'register');
