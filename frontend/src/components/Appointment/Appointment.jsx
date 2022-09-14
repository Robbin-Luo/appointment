import React, { useState, useEffect } from 'react'
import doctors from '../../source/doctors'
import timeSlots from '../../source/timeSlots'
import Calendar from './Calendar/Calendar'
import './Appointment.css'
import axios from '../../config'


const Appointment = (props) => {
  const [timeSlot, setTimeSlot] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [err, setErr] = useState('')
  const [booked, setBooked]=useState('')
  const { user, setLoading } = props;

  useEffect(() => {
      const fetchData = async () => {
        if(doctor==='Select your doctor' || !doctor || !date){
          return;
        }else{
          setLoading(true);
          try {
            const res = await axios.post('./api/booked', { doctor, date });
            setLoading(false);
            setBooked(res.data);
          } catch (err) {
            console.log(err);
            setLoading(false);
            const status = err.response?.status;
            if (status === 500) {
              setErr(err.response?.statusText)
            } else if (err.data?.message) {
              setErr(err.data.message);
            } else {
              setErr(err.message)
            }
          }
        } 
      }
      fetchData();
  }, [doctor, date, setLoading]);

  const bookedSlots=[];
  for(let i=0; i<booked.length; i++){
    bookedSlots.push(booked[i].timeSlot)
  };

  useEffect(()=>{
    setErr('')
  },[timeSlot, date, doctor])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/signup';
    } else {
      setLoading(true);
      try {
        const res = await axios.post('/api/appointment', { doctor, user, date, timeSlot });
        setLoading(false);
        alert(`Appointment with ${res.data.doctor} at ${res.data.date} ${timeSlot} Booked`)
      } catch (err) {
        setLoading(false);
        const status = err.response?.status;
        if(status===409){
          setErr('The time slot has been booked, try anotherone');
        }else if (status === 500) {
          setErr(err.response?.statusText)
        } else if (err.data?.message) {
          setErr(err.data.message);
        } else {
          setErr(err.message)
        }
      }
    }
  }

  return (
    <div className='max-width'>

      <div className='core main' >
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Book An Appointment</h1>
        {err ? <p className='err'>{err}</p> : <p></p>}
        <select name="doctors" id="doctors" onChange={e => setDoctor(e.target.value)} >
          <option >Select your doctor</option>
          {
            doctors.map(doctor => <option key={doctor.name} >{doctor.name}</option>)
          }
        </select>
        <Calendar setDate={setDate} />
        <form className="timeSlots">
          {timeSlots.map(slot =>  bookedSlots.includes(slot)?
                                  <div key={slot}>
                                    <input type='radio' name='timeSlot' value={slot} id={slot} onChange={() => setTimeSlot(slot)} disabled/>
                                    <label htmlFor={slot} style={{textDecoration:'line-through'}}>{slot}</label>
                                  </div>:
                                  <div key={slot}>
                                    <input type='radio' name='timeSlot' value={slot} id={slot} onChange={() => setTimeSlot(slot)} />
                                    <label htmlFor={slot}>{slot}</label>
                                  </div>)}
          <button className='button' disabled={!timeSlot || !doctor || !date || doctor === 'Select your doctor'} onClick={handleSubmit}>Confirm Appointment</button>
        </form>

      </div>
    </div>
  )
}


export default Appointment