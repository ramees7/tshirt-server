const admins=require('../Models/adminSchema')
const users=require('../Models/userSchema')

exports.adminRegister=async(req,res)=>{
    try{
        const {username,email,phone,password,confirmpassword}=req.body
        const existingAdmin=await admins.findOne({email,phone,password})
        const existingUser=await users.findOne({email,phone,password})
        if(existingAdmin || existingUser){
            res.status(401).json("Existing User ! Use Unique Email " )
        }
        else{
            const newAdmin=new admins({username,email,phone,password,confirmpassword})
            await newAdmin.save()
            res.status(200).json(newAdmin)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}