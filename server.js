const express = require("express")

const mongoose = require("mongoose")
const path = require('path')

const port = 3019
const app = express();

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log('connected to database')
})

const userSchema = new mongoose.Schema({
    name:String,
    phone:String,
    address:String,
    password:String
})

const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form1.html'))

})

app.post('/post',async (req,res)=>{
    const {name,phone,address,password} = req.body
    const user = new Users({
        name,
        phone,
        address,
        password
    })
    await user.save()
    console.log(user)
    res.send("Form Submitted")
})

app.listen(port,()=>{
    console.log("Server Started ")
})
