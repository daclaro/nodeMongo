const router =require('express-router')
const express=require('express')
const User=require('../../models/User.js')
const app=express()
const usersRouter = express.Router();
const bcrypt = require('bcrypt')


usersRouter.get('/',async (req,res)=>{
  const data=await User.find({})
   return res.json(data)
   console.log('router working for users')
})

usersRouter.post('/',async(req,res)=>{
  const saltRounds = 10
  
  console.log(req.body)
  const {email,name,password}=req.body
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const User1=new User({
    email,
    name,
    password:passwordHash
  }
  )
  await User1.save()
  return res.json('success note post request')
  }
  
  )

  

module.exports=usersRouter