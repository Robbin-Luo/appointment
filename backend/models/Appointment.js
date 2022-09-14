const mongoose=require('mongoose');
const {Schema}=require('mongoose');

const AppointmentSchema=new Schema({
  user:{type:String, required:true},
  doctor:{type:String, required:true},
  date:{type:String, required:true},
  timeSlot:{type:String, required:true},
})

module.exports=mongoose.model('Appointment', AppointmentSchema)