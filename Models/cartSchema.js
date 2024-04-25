const mongoose=require('mongoose')


const cartSchema=new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    mrp:{
        type:String,
        required:true
    },
    offerprice:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    totalprice:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    }
})

const carts=mongoose.model("carts",cartSchema)
module.exports=carts