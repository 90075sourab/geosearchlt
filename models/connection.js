const mongoose=require("mongoose");
const URL="mongodb://localhost:27017/geosearch"
mongoose.connect(URL,{ 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
})

module.exports=mongoose.connection;
