const mongoose=require('mongoose')
const messageSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:[true,'sender must be a user'],
        ref:'users'
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:[true,'receiver must be a user'],
        ref:'users'
    },
    messages:{
        type:[String],
        minLength:1,
        validate: {
            validator: function (val) {        
              return val.length > 0;
            },
            message: "At least one feature is required",
          },
    },
    date:{
        type:Date,
        default:Date.now()
    },

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
  )

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending


//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// userSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// tourSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });

// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// userSchema.virtual('',{
//  
// })

module.exports=mongoose.model('message',messageSchema)