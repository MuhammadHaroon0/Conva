const express=require('express')
const router=express.Router()
const {getAll,getOne,createOne,updateOne,deleteOne}=require('../controllers/handlerFactory');
const {protect}=require('../controllers/authController');
const messageModel = require('../models/messageModel');
const {getAllMessagesOfSingleUser}=require('./../controllers/messageController');
const { deleteConversation, deleteMessage, addMessage } = require('../socketHandler');
router.use(protect)
router.route('/').get(getAll(messageModel));
router.route('/:senderId').get(getAllMessagesOfSingleUser())

module.exports=router