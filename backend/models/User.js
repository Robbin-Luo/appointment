const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const UserSchema=new Schema({
  username:{type:String, required:true, unique:true, dropDups:true},
  pwd:{type:String, required:true},
  email:{type:String, required:true, unique:true, dropDups:true},
  mobile:{type:String, required:true},
  isAdmin:{type:Boolean, default:false}
})

module.exports=mongoose.model('User', UserSchema);