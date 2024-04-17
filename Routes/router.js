const express=require('express')

const adminController=require('../controller/adminController')
const userController=require('../controller/userController')
const brandController=require('../controller/brandController')
const categoryController=require('../controller/categoryController')
const productController=require('../controller/productController')


const multerConfig=require('../Middleware/imageMiddleware')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const router=new express.Router()

router.post('/registeradmin',adminController.adminRegister)
router.post('/registeruser',userController.userRegister)
router.post('/registeruserotp',userController.userRegisterOtp)
router.post('/login',userController.login)
router.post('/addproduct',jwtMiddleware,multerConfig.fields([{name:"thumbnail" ,maxCount:1},{name:"image_1" ,maxCount:1},{name:"image_2" ,maxCount:1},{name:"image_3" ,maxCount:1},{name:"image_4" ,maxCount:1}]),productController.addProduct)
router.post('/addbrand',jwtMiddleware,multerConfig.single('image'),brandController.addBrand)
router.post('/addcategory',jwtMiddleware,multerConfig.single('image'),categoryController.addCategory)
router.get('/getallproducts',jwtMiddleware,productController.getAllProducts)
router.get('/getbrands',jwtMiddleware,brandController.getBrand)
router.get('/getcategories',jwtMiddleware,categoryController.getCategories)

module.exports=router