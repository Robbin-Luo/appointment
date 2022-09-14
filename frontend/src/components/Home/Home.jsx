import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className='max-width'>
      <div className='core main'>
        <h1>About MyHealth Clinic</h1>
        <p>MyHealth clinic was found in 1970s by Dr Zhang. It is a great honor to us that we have gained very good reputation among our thousands of patients during our more than 40 years' medical practice.</p>
        <Link to='/doctors' className='link'>Check Our Doctors...</Link><br />
        <Link to='/appointment' className='link'>Book An Appointment...</Link>
        <div className='img-container'>
          <img src='https://myhealth.net.au/wp-content/uploads/2021/08/MyHealthBackground-1.jpg' alt='myhealth-clinic'/>
        </div>
      </div>
    </div>
  )
}

export default Home