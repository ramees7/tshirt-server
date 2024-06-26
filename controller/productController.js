const products = require('../Models/productSchema')


exports.addProduct = async (req, res) => {
    try {
        console.log("Inside Product Adding");
        const { category, brand, mrp, offerprice, color, size_small, size_medium,
            size_large, size_XL, newarrival, trending } = req.body

        const imageFiles = req.files
        console.log(imageFiles);
        const newProduct = new products({
            category, brand, mrp, offerprice, color, size_small, size_medium,
            size_large, size_XL, newarrival, trending, thumbnail: imageFiles['thumbnail'][0].filename, image_1: imageFiles['image_1'][0].filename, image_2: imageFiles['image_2'][0].filename, image_3: imageFiles ? ['image_3'][0].filename : "", image_4: imageFiles ? ['image_4'][0].filename : ""
        })
        console.log(newProduct);
        await newProduct.save()
        res.status(200).json(newProduct)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        console.log("Inside Get All Products")
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.getOneProduct = async (req, res) => {
    const { id } = req.params
    try {
        console.log("Inside Get One Product")
        const result = await products.findOne({ _id: id })
        res.status(200).json(result)
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.editProduct = async (req, res) => {
    try {
        const { category, brand, mrp, offerprice, color, size_small, size_medium,
            size_large, size_XL, newarrival, trending } = req.body
        const { id } = req.params
        const updated_thumbnail = req.file ? req.file.filename : req.body.thumbnail
        console.log("inside edit product");
        const result = await products.updateOne({ _id: id }, {category, brand, mrp, offerprice, color, size_small, size_medium,
            size_large, size_XL, newarrival, trending, thumbnail: updated_thumbnail
        })
        res.status(200).json(result)
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deleteProduct=async(req,res)=>{
    try{
        console.log("Delete product")
        const {id}=req.params
        const result=await products.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}