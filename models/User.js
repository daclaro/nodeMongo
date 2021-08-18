require('dotenv').config()
const mongoose = require('mongoose')
const url =process.env.MONGODB_URI
console.log(url)
const userSchema=new mongoose.Schema({
email:{type:String,required:true},
name:{type:String,required:true},
password:{type:String,required:true},
}
)
const User = mongoose.model('User', userSchema)
const User1=new User({
email:"fullstack@gmail.com",
name:"fullstack",
password:"fullstack123"
}
)
//connect old string 2.2 noide mongo

const main=async()=>{
    try{
    await mongoose.connect(url, {      connectTimeoutMS: 300000,
        socketTimeoutMS: 300000, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

    }
    catch (error) {
    console.error(error);
  }
  

}
main()

module.exports=User