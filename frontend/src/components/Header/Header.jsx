import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import {RiArrowDropDownLine} from 'react-icons/ri'
import {GoTriangleUp} from 'react-icons/go'
import { removeCookie } from '../../utils/Cookie'
import './Header.css'

const Header = (props) => {
  const dropdownmenuRef=useRef();
  const dropdownbtn=useRef();
  const {user, setUser, setSigninSuccess, signinSuccess, userInfo}=props;

  const signOut=()=>{
    setUser('');
    setSigninSuccess(false);
    removeCookie('usrin');
  }

  return (
    <div className='header max-width'>
      <div className='core center'>
        <Link to='/'>
          <img src='https://myhealth.net.au/wp-content/uploads/2021/08/Myhealth-logo.png' alt='my-health-clinic'></img>
        </Link>
        <div className='header-right'>
          {!user?
            <div className='dropdown' data-dropdown>
              <button className='dropdown-btn' ref={dropdownbtn} data-dropdownbtn data-dropdown>Patient<RiArrowDropDownLine data-dropdownbtn data-dropdown/></button>
              <div className='dropdown-menu' id='dropdownMenu' ref={dropdownmenuRef} data-dropdownmenu data-dropdown>
                <GoTriangleUp data-dropdownmenu data-dropdown/>
                <Link to='/signin'><button>Exsiting Patient Sign In</button></Link>
                <hr />
                <Link to='/signup'><button>New Patient Sign Up</button></Link>
              </div>
            </div>:
            <div className='dropdown' data-dropdown>
              <button className='dropdown-btn' ref={dropdownbtn} data-dropdownbtn data-dropdown>{user}<RiArrowDropDownLine data-dropdownbtn data-dropdown/></button>
              <div className='dropdown-menu' id='dropdownMenu' ref={dropdownmenuRef} data-dropdownmenu data-dropdown>
                <GoTriangleUp data-dropdownmenu data-dropdown/>
                <Link to='/myprofile'><button>My profile</button></Link>
                <hr />
                <Link to='/myappointment'><button>My appointment</button></Link>
                <hr />
                {userInfo.isAdmin?
                  <div><Link to='/manage-appointments'><button>Manage appointments</button></Link><hr /></div>
                  :''
                }
                <button onClick={signOut}>SignOut</button>
              </div>
            </div>
            
          }
          {signinSuccess?'':<Link to='/appointment'>Book</Link>}
        </div>
      </div>
    </div>
  )
}

export default Header