import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {MdDelete} from 'react-icons/md'
import './ManageAppointments.css'

const MyAppointment = (props) => {
  const { setLoading } = props;
  const[appointments, setAppointments]=useState([]);
  const[err, setErr]=useState('');

  const handleDelete=async(app)=>{
    if(window.confirm('Confirm to delete this appointment')){
      setLoading(true);
    const _id=app._id;
    try{
      setLoading(false);
      await axios.post('/api/cancel-appointment',{_id});
      const {doctor, date, timeSlot}=app;
      alert(`Appointment for ${doctor} at ${new Date(date).getFullYear()}-${new Date(date).getMonth()+2}-${new Date(date).getDate()} ${timeSlot} was deleted`);
      window.location.reload();
    }catch(err){
      if(err.response){
        setErr(err.response.statusText)
      }else{
        setErr(err.message)
      }
    }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/api/manage-appointments');
        setAppointments(res.data.sort((a,b)=>{
          return new Date(a.date)-new Date(b.date);
        }));
        setLoading(false);
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
    fetchData();
  }, [setLoading]); 

  return (
    <div className='max-width'>
      <div className='core main'>
        <div className="appointments">
          {err?<p className='err'>{err}</p>:appointments.length===0?<p style={{textAlign:'center'}}>No appointment found</p>:''}
          {appointments.length>0?appointments.map(app=> <div className='appointment' key={Math.random()}>
                                                          <div>{app.user}</div><div>{app.doctor}</div><div>{new Date(app.date).getFullYear()}-{new Date(app.date).getMonth()+2}-{new Date(app.date).getDate()}</div><div>{app.timeSlot}</div><MdDelete onClick={()=>handleDelete(app)}/>
                                                        </div>):''}
        </div>
      </div>
    </div>
  )
}

export default MyAppointment