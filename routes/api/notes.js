const router =require('express-router')
const express=require('express')
const Note=require('../../models/Note.js');
const User = require('../../models/User.js');
const app=express()
const notesRouter = express.Router();


notesRouter.get('/',async (req,res)=>{
  const data=await Note.find({})
  return res.json(data)
   console.log('router working for notes')
})

notesRouter.post('/',async(req,res)=>{
  console.log(req.body)
const {content,important}=req.body

const Note1=new Note({
  content,
  important
}
)
await Note1.save()
return res.json('success note post request')
}

)


module.exports=notesRouter