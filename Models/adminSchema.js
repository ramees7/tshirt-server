const mongoose=require('mongoose')
const validator=require('validator')

const adminSchema=new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
})

const admins=mongoose.model('admins',adminSchema)
module.exports=admins