const Message = require("./models/messageModel");
const Users = require("./models/userModel");
const catchAsync = require("./utils/catchAsync");

exports.addMessage=async(data)=>{
    const rec=await Users.findOne({email:data.receiver}).select("+name")
    if(!rec)
    {
        return {
            status: 'fail',
            msg:"User not exists",
            errCode:404
        }
    }
    // console.log(data.sender);
    let doc=await Message.findOne({sender:data.sender,receiver:rec._id});
    const sen=await Users.findById(data.sender).select("+name")
    if(!doc)
    {
        doc=await Message.create({
            sender:data.sender,
            receiver:rec._id,   
            names:[sen.name,rec.name],
            receiverEmail:data.receiver,
            messages:[data.message],
        })
        await doc.save()
    }
    else
    {
        doc.messages.push(data.message)
        await doc.save()
    }
    return doc
    
}



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