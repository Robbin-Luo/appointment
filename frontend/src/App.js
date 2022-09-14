import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'
import GroupDisplay from './components/GroupDisplay/GroupDisplay';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import { useState } from 'react';
import './App.css'
import Appointment from './components/Appointment/Appointment';
import MyAppointment from './components/MyAppointment/MyAppointment';
import ManageAppointments from './components/ManageAppointment/ManageAppointments'
import {getCookie} from './utils/Cookie'

function App() {
  const checkUser=getCookie('usrin')
  const[user, setUser]=useState(checkUser===undefined?'':JSON.parse(checkUser).username);
  const[signinSuccess, setSigninSuccess]=useState(checkUser===undefined?false:true);
  const[loading, setLoading]=useState(false);
  const[userInfo, setUserInfo]=useState(checkUser===undefined?{}:JSON.parse(checkUser));

  return (
    <div className="App">
      <BrowserRouter>
        <Header user={user} setSigninSuccess={setSigninSuccess} setUser={setUser} signinSuccess={signinSuccess} userInfo={userInfo}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/doctors' element={<GroupDisplay />}/>
          <Route path='/signup' element={<SignUp setLoading={setLoading}/>}/>
          <Route path='/signin' element={<SignIn setUser={setUser} setSigninSuccess={setSigninSuccess} setLoading={setLoading} setUserInfo={setUserInfo}/>}/>
          <Route path='/appointment' element={<Appointment user={user} setLoading={setLoading}/>}/>
          <Route path='/myappointment' element={<MyAppointment user={user} setLoading={setLoading}/>} />
          <Route path='/manage-appointments' element={<ManageAppointments setLoading={setLoading}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {loading?<div className='loading'><LoadingSpinner /></div>:<div></div>}
    </div>
  );
}

export default App;
