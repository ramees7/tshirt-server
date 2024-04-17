const admins = require('../Models/adminSchema')
const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)


let OTP, verify, user
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

                // let digits = '0123456789'
                // OTP = ""
                // for (let i = 0; i < 6; i++) {
                //     OTP += digits[Math.floor(Math.random() * 10)]
                // }
                // console.log(OTP);
                // client.verify.v2.services("VA1a4d87b4027b3243ec4bde829c56eda8")
                //     .verifications
                    // .create({ to: '+919207424420', channel: 'sms' })
                    // .create({
                    //     body: `Your T-Hub Registration Verification for User ${username} is ${OTP}`,
                    //     // from: "+919207424420", // Your Twilio phone number
                    //     to: '+919207424420',
                    //     channel: "sms"
                    // })
                    // .then(verification => verify = verification.sid)
                // console.log(verify);
                //  client.verify.v2.services("VA1a4d87b4027b3243ec4bde829c56eda8")
                //  verifications
                // .create({
                //     body: `Your T-Hub Registration Verification for User ${username} is ${OTP}`,
                //     // from: "+919207424420", // Your Twilio phone number
                //     to: '+919207424420',
                //     channel: "sms"
                // })
                // res.status(200).json({ message: 'Verification code sent successfully' });
                // client.messages.create({

                //         body: `Your T-Hub Registration Verification for User ${username} is ${OTP}`,
                //         MessagingServiceSid:'VA1a4d87b4027b3243ec4bde829c56eda8',
                //         to:"+919207424420",
                //     })
                // .then(()=>res.status(200).json("message sent"))
            }
            else {
                res.status(402).json("Password Doesnt Match")
            }

        }
    }
    catch (err) {
        res.status(401).json(err + " fggf")
    }
}

exports.userRegisterOtp = async (res, req) => {
    console.log(user);
    try {
        const { otp } = req.body
        if (otp != OTP) {
            res.status(401).json("Incorrect OTP")
        }
        else {
            user = await users.save()
            res.status(200).json(user)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

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