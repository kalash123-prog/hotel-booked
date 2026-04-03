const mongoose=require("mongoose");
const user=require("./user.js");
const reviewschema=mongoose.Schema({
    comment:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdat:{
        type:Date,
        default:new Date(),
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
});

module.exports=mongoose.model("review",reviewschema);