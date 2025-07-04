const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{type: String, required:true},
    age:{type:Number, required:true},
    experience:{type:Number, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
});
const User=mongoose.model('User',userSchema);
module.exports=User;