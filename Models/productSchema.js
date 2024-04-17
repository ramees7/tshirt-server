const mongoose = require('mongoose')

const productSchema =new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    image_1: {
        type: String,
        required: true
    },
    image_2: {
        type: String,
        required: true
    },
    image_3: {
        type: String
    },
    image_4: {
        type: String,
    },
    mrp: {
        type: String,
        required: true
    },
    offerprice: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size_small: {
        type: String,
        required: true
    },
    size_medium: {
        type: String,
        required: true
    },
    size_large: {
        type: String,
        required: true
    },
    size_XL: {
        type: String,
        required: true
    },
    newarrival: {
        type: String,
        required: true
    },
    trending: {
        type: String,
        required: true
    }
})

const products=mongoose.model("products",productSchema)
module.exports=products
