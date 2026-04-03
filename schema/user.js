const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;
const userschema=new Schema({
    email:{
        type:String,
    },
});

userschema.plugin(passportLocalMongoose);//this will store the username and and also provide hashing to password with salting means adding extr value to it
module.exports=mongoose.model("user",userschema);
//hashing means we put the password in hash function and will convert into unidentified value which is of fixed length
//it is one way we cant get input from output