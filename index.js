require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./connections/db')
const router=require('./Routes/router')
const bodyParser = require('body-parser');


// Express 4.0


const tshirtServer=express()
tshirtServer.use(bodyParser.json({ limit: '10mb' }));
tshirtServer.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
tshirtServer.use(cors())
tshirtServer.use(express.json())
tshirtServer.use(router)


const PORT=3000 || process.env.PORT

tshirtServer.use('/upload',express.static('./uploads'))

tshirtServer.listen(PORT,()=>{
    console.log('Ekart server started ' + PORT);
})

tshirtServer.get('/',(req,res)=>{
    res.send("<h1>Daily Cart Started... Waiting for Client requests...!!</h1>")
})
