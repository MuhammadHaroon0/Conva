const express=require('express')
const router=express.Router()
const {updateOne,getOne,deleteOne}=require('../controllers/handlerFactory')
const {signUp,login,forgotPassword,resetPassword, updatePassword,protect}=require('../controllers/authController');
const {getAll, deleteMe,updateMe, uploadUserImage, resizeUserImage}=require('../controllers/userController');
const userModel = require('../models/userModel');

router.post('/signup',signUp)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.patch('/resetPassword/:resetToken',resetPassword)
router.patch('/updatePassword',protect,updatePassword)

router.route('/').get(getAll).delete(protect,deleteMe).patch(protect,uploadUserImage,resizeUserImage,updateMe)



module.exports=router