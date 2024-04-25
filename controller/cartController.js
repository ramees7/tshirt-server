const carts=require('../Models/cartSchema')


exports.addToCart=async(req,res)=>{
    try{
        console.log("inside add to cart")
        const { productId,category,size,mrp,offerprice,quantity,totalprice,thumbnail}=req.body
        const userId=req.payload
        console.log(userId);
        const existingProduct=await carts.findOne({userId,productId})
        // console.log(existingProduct);
        if(existingProduct){
            existingProduct.quantity++
            existingProduct.totalprice=existingProduct.quantity* existingProduct.offerprice
            await existingProduct.save()
            res.status(200).json(existingProduct)
            console.log(existingProduct);
        }
        else{
            console.log("gsdg");
            const newCart=new carts({
                productId,category,size,mrp,offerprice,quantity,totalprice:offerprice,thumbnail,userId
            })
            await newCart.save()
            res.status(200).json("Item Added to Cart")
            console.log(newCart);
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getCart=async(req,res)=>{
    try{
        console.log("Inside get cart")
        const userId=req.payload
        const cartProducts=await carts.find({userId})
        res.status(200).json(cartProducts)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.removeFromCart=async(req,res)=>{
    try{
        console.log(" inside remove From Cart")
        const {id}=req.params
        const result=await carts.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.emptyCart=async(req,res)=>{
    try{
        userId=req.payload
        console.log(" inside remove From Cart")
        const result=await carts.deleteMany({userId})
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}






exports.increaseQuantity = async (req, res) => {
    try {
        const cartId = req.params.id
        const existingProduct = await carts.findOne({ _id: cartId })
        existingProduct.quantity++
        existingProduct.totalprice = existingProduct.offerprice * existingProduct.quantity
        await existingProduct.save()
        res.status(200).json("Qunatity Increased")
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.decreaseQuantity = async (req, res) => {
    try {
        const cartId = req.params.id
        const existingProduct = await carts.findOne({ _id: cartId })
        if (existingProduct.quantity > 1) {
            existingProduct.quantity--
            existingProduct.totalprice = existingProduct.offerprice * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json("Qunatity Increased")
        }
        else{
            res.status(201).json("Minimum Quantity 1")
        }

    }
    catch (err) {
        res.status(401).json(err)
    }
}
