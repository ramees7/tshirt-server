const brands=require('../Models/brandSchema')


exports.addBrand=async(req,res)=>{
    try{
        console.log("Inside Brand adding");
        const {name,description}=req.body
        const image=req.file.filename
        const existingBrand=await brands.findOne({name})
        if(existingBrand){
            res.status(401).json("Already Existing Product !!")
        }
        else{
            const newBrand= new brands({name,image,description})
            await newBrand.save()
            res.status(200).json(newBrand)
            console.log(newBrand)
        }
    }
    catch(err){
        res.status(401).json(err +"dsfdsf")
        console.log(err);
    }
}

exports.getBrand=async(req,res)=>{
    try{
        console.log("Inside Get Brand")
        const allBrands=await brands.find()
        res.status(200).json(allBrands)
    }
    catch(err){
        res.status(401).json(err)
    }
}