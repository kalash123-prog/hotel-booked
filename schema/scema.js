const mongoose=require("mongoose");
const review=require("./review.js");
const user=require("./user.js");
const hotelschema=mongoose.Schema({

    title:{
        type:String,
    },
      description:{
        type:String,
    },
      image:{
        filename:{
          type:String,
        },
         url:{
          type:String,
      },
    },
      price:{
        type:Number,
    },
      location:{
        type:String,
    },
     country:{
        type:String,
     },
     reviews:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"review"
     }],
     owner:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
     },
       category: {
    type: String,
    enum: ["Rooms", "Mountains", "Camping", "Farms"],
    default: "Rooms"
  }
});


hotelschema.post("findOneAndDelete",async(data)=>{
  if(data){
 await review.deleteMany({_id:{$in:data.reviews}});
  }
});
module.exports=mongoose.model("data",hotelschema);

