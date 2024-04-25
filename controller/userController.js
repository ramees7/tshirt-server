const admins = require('../Models/adminSchema')
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


exports.userRegister = async (req, res) => {
    try {
        const { username, email, phone, password, confirmpassword } = req.body
        const existingAdmin = await admins.findOne({ email, password, phone })
        const existingUser = await users.findOne({ email, password, phone })
        if (existingAdmin || existingUser) {
            res.status(401).json("Existing User ! Use Unique Email ")
        }
        else {
            if (password === confirmpassword) {
                console.log("inside pass");
                const newUser = new users({ username, email, phone, password, confirmpassword })
                await newUser.save()
                res.status(200).json(newUser)
            }
            else {
                res.status(402).json("Password Doesnt Match" )
            }

        }
    }
    catch (err) {
        res.status(401).json(err )
    }
}

// exports.userRegisterOtp = async (res, req) => {
//     console.log(user);
//     try {
//         const { otp } = req.body
//         if (otp != OTP) {
//             res.status(401).json("Incorrect OTP")
//         }
//         else {
//             user = await users.save()
//             res.status(200).json(user)
//         }
//     }
//     catch (err) {
//         res.status(401).json(err)
//     }
// }

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body
        const existingAdmin = await admins.findOne({ phone, password })
        const existingUser = await users.findOne({ phone, password })
        if (existingAdmin) {
            const token = jwt.sign({ userId: existingAdmin._id }, process.env.JWT_SUPERKEY)
            res.status(200).json({
                existingAdmin,
                token,
                role: "Admin"
            })
        }
        else {
            if (existingUser) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SUPERKEY)
                res.status(200).json({
                    existingUser,
                    token,
                    role: "User"
                })
                console.log(existingUser);
            }
            else {
                res.status(401).json("No User Found ! Enter Valid Data")
            }

        }
    }
    catch (err) {
        res.status(406).json(err)
    }
}

exports.userFind=async(req,res)=>{
    console.log(req.payload);
    try{
        const result=await users.findOne({_id:req.payload})
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { username, email, phone, password, confirmpassword, firstname, lastname, gender, address, street, pincode } = req.body
        const { id } = req.params
        const updated_image = req.file ? req.file.filename : req.body.user_image
        console.log("inside the update profile");
        const result = await users.updateOne({ _id: id }, { username, email, password, confirmpassword, phone, firstname, lastname, gender, address, street, pincode, user_image: updated_image })
        res.status(200).json(result)
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deletUser=async(req,res)=>{
    try{
        console.log("Inside Delete User")
        const _id=req.payload
        const result=await users.deleteOne({_id})
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}