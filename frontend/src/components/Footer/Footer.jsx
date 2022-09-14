import React from 'react'
import './Footer.css'
import { BsTelephoneFill } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer>
      <div className='core'>
        <a href='https://g.page/MyhealthRingwood?share' target='blank'>Eastland Shopping Centre, Shop 1113, Level 1/171-175 Maroondah Hwy, Ringwood VIC 3134</a>
        <div>
          <a href='tel:0370182400'><BsTelephoneFill /> 03 70182400</a>
          <span>&copy;MyHealth Clinic All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer