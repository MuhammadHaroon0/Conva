const Message = require("./models/messageModel");
const catchAsync = require("./utils/catchAsync");
exports.addMessage=(data)=>catchAsync(async()=>{
    let doc=await Message.findOne({sender:data.sender,receiver:data.receiver});
    if(!doc)
    {
        doc=await Message.create({
            sender:data.sender,
            receiver:data.receiver,
            messages:[data.message],
        })
    }
    else
    {
        doc.messages.push(data.message)
        await doc.save()
    }
    return {
        status: 'success',
        totalResults: doc.length,
        data: {
            doc,
        },
    };
})

exports.deleteConversation=(convId)=>catchAsync(async()=>{
    const doc=await Message.findByIdAndRemove({_id:convId});
    if(!doc)
    {
        return {
            status: "error",
            msg: "No document found matching this id",
        };
    }
    return {
        status: 'success',
        data: {
            doc,
        },
    };
})

exports.deleteMessage=(convId,msgIndex)=>catchAsync(async(req,res,next)=>{
    const doc=await Message.findById({_id:convId});
    if(!doc)
    {
        return {
            status: "error",
            msg: "No document found matching this id",
        };
    }
    doc.messages.splice(msgIndex,1)
    await doc.save()
    return {
        status: 'success',
        data: {
            doc,
        },
    };
})