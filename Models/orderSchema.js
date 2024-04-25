const mongoose=require('mongoose')
const products = require('./productSchema')


const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true,
    },
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    orderNo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    totalOrderPrice:{
        type:String,
        required:true
    },
    deliveryDate:{
        type:String,
        required:true
    },
    statusOrdered:{
        type:String,
        required:true
    },
    statusPlaced:{
        type:String,
        required:true
    },
    statusShipped:{
        type:String,
        required:true
    },
    statusDelivered:{
        type:String,
        required:true
    }

})

const orders=mongoose.model("orders",orderSchema)
module.exports=orders