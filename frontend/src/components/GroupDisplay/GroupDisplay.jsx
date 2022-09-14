import React from 'react'
import './GroupDisplay.css'

const GroupDisplay = () => {
  return (
    <div className='max-width'>
      <div className='core display-core'>
        <h1>Our Doctors</h1>
        <div className='group-display-container'>
          <div className='display-container'>
            <figure>
              <img src="https://previews.123rf.com/images/rastudio/rastudio1804/rastudio180400046/98594215-smiling-caucasian-white-doctor-holding-a-medical-injection-syringe-with-vaccine-young-hipster-doctor.jpg" alt="a doctor" />
              <figcaption>Dr Zhang</figcaption>
              <p>FRCPA<br />FRACGP<br />FRANZCR<br />FRANZCP</p>
            </figure>
          </div>
          <div className='display-container'>
            <figure>
              <img src="https://previews.123rf.com/images/rastudio/rastudio1804/rastudio180400046/98594215-smiling-caucasian-white-doctor-holding-a-medical-injection-syringe-with-vaccine-young-hipster-doctor.jpg" alt="a doctor" />
              <figcaption>Dr Liu</figcaption>
              <p>FRCPA<br />FRACGP<br />FRANZCR<br />FRANZCO</p>
            </figure>
          </div>
          <div className='display-container'>
            <figure>
              <img src="https://previews.123rf.com/images/rastudio/rastudio1804/rastudio180400046/98594215-smiling-caucasian-white-doctor-holding-a-medical-injection-syringe-with-vaccine-young-hipster-doctor.jpg" alt="a doctor" />
              <figcaption>Dr Zhao</figcaption>
              <p>FRCPA<br />FRACGP<br />FRANZCP<br />FRANZCO</p>
            </figure>
          </div>
          <div className='display-container'>
            <figure>
              <img src="https://previews.123rf.com/images/rastudio/rastudio1804/rastudio180400046/98594215-smiling-caucasian-white-doctor-holding-a-medical-injection-syringe-with-vaccine-young-hipster-doctor.jpg" alt="a doctor" />
              <figcaption>Dr Sun</figcaption>
              <p>FRCPA<br />FRANZCR<br />FRANZCP<br />FRANZCO</p>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupDisplay