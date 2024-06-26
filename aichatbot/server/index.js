const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeModel=require('./models/Employe')
const app= express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/Chat");
app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  EmployeModel.findOne({email:email})
  .then(user=>{
      if(user){
          if(user.password===password)
          {
              res.json("Success")
          }else{
              res.json("The password is incorrect")
          }
      }else{
          res.json("No record existed")
      }
  })
})

 app.post('/register',(req,res)=>{
   EmployeModel.create(req.body) 
   .then(employes =>res.json(employes))
   .catch(err=>res.json(err))
 })
app.listen(3001,() => {
    console.log("server is running")
})