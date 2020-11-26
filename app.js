const express=require("express");
const bodyParser=require("body-parser");
const conn=require("./models/connection");
const app=express();
const route=require("./routes/root");


app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))


app.use("/register",route.register)
app.use("/record",route.record)
app.use("/",route.search)





conn.on('connected',()=>console.log("mongoose connected"));
app.listen(8000,()=>console.log("server is running"));