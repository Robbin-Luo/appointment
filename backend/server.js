require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User')
const Appointment = require('./models/Appointment')
const bcrypt = require('bcrypt')
const path=require('path')


const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/signin', async (req, res) => {
  const { username, pwd } = req.body;
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      res.status(404).send('Username not found')
    } else {
      const match = await bcrypt.compare(pwd, foundUser.pwd);
      if (!match) {
        res.sendStatus(401);
      } else {
        res.status(202).send(foundUser);
      }
    }
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post('/api/signup', async (req, res) => {
  const { username, pwd, email, mobile } = req.body;
  try {
    const cryptedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({ username, pwd: cryptedPwd, email, mobile });
    console.log(result);
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.sendStatus(409)
    } else {
      res.sendStatus(500)
    }
  }
})

app.post('/api/appointment', async (req, res) => {
  const { doctor, user, date, timeSlot } = req.body;
  const appointmentsOfTheDoctorOfTheDate = await Appointment.findOne({ doctor, date, timeSlot });
  if (!appointmentsOfTheDoctorOfTheDate) {
    try {
      const result = await Appointment.create({ doctor, user, date, timeSlot });
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  } else {
    res.status(409).send({ message: 'The time-slot had been booked, try anotherone' });
  }
})



app.post('/api/booked', async (req, res) => {
  const { doctor, date } = req.body;
  var result;
  try {
    result = await Appointment.find({ date, doctor });
    
    if (!result) {
      res.status(200).send([]);
    }else {
      res.status(200).send(result);
    }
  } catch (err) {
    res.sendStatus(500);
  }
})
app.post('/api/myappointment', async (req, res) => {
  const {user}=req.body;
  var result;
  try {
    result = await Appointment.find({ user });
    if (!result) {
      res.status(200).send([]);
    }else {
      res.status(200).send(result);
    } 
  } catch (err) {
    res.sendStatus(500);
  }
})

app.get('/api/manage-appointments', async (req, res) => {
  var result;
  try {
    result = await Appointment.find({ });
    if (!result) {
      res.status(200).send([]);
    }else {
      res.status(200).send(result);
    } 
  } catch (err) {
    res.sendStatus(500);
  }
})

app.post('/api/cancel-appointment', async(req,res)=>{
  const {_id}=req.body;
  try{
    const result=await Appointment.deleteOne({_id});
    res.status(200).send(result)
  }catch(err){
    res.sendStatus(500)
  }
})

app.use(express.static(path.join(__dirname,'../frontend/build')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});

const PORT = process.env.PORT || 3001;
// app.listen(PORT, console.log(`Server is running on ${PORT}`));
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) }))
  .catch(err => { console.log(err) });