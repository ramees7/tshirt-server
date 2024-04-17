const categories=require('../Models/categorySchema')

exports.addCategory=async(req,res)=>{
    try{
        console.log("Inside Category Adding");
        const {name}=req.body
        const image =req.file.filename
        console.log(req.file.filename);
        const existingCategory=await categories.findOne({name})
        if(existingCategory){
            res.status(401).json("Already Existing Product !!")
        }
        else{
            const newCategroy= new categories({name,image})
            await newCategroy.save()
            res.status(200).json(newCategroy)
            console.log(newCategroy);
        }
    }
    catch(err){
        res.status(401).json(err)
        console.log(err);
    }
}


exports.getCategories=async(req,res)=>{
    try{
        console.log("Inside Get Category")
        const allCategories=await categories.find()
        res.status(200).json(allCategories)
    }
    catch(err){
        res.status(401).json(err)
    }
}