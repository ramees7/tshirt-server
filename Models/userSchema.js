const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Invalid Email Address"]
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required:true,
        unique:true
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    gender:{
        type:String
    },
    address:{
        type:String
    },
    street:{
        type:String
    },
    pincode:{
        type:String
    },
    user_image:{
        type:String
    }
})

const users=mongoose.model('users',userSchema)
module.exports=users