const mongoose = require('mongoose')


const brandSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const brands=mongoose.model("brands" ,brandSchema)
module.exports=brands