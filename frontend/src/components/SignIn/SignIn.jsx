import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignIn.css'
import axios from 'axios'
import {removeCookie,setCookie} from '../../utils/Cookie'

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const {setUser, setSigninSuccess, setLoading, setUserInfo}=props;

  const validUsername = /[a-zA-Z\d_-]{8,16}/.test(username);
  const validPwd = /[a-z]/.test(pwd) && /[A-z]/.test(pwd) && /\d/.test(pwd) && /[~!@#$%&*]/.test(pwd) && pwd.length >= 8 && pwd.length <= 24;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!validUsername || !validPwd){
      alert('Invalid Username or Password');
      return;
    }
    try {
      const res =await axios.post('/api/signin', { username, pwd});
      removeCookie('usrin');
      setCookie('usrin', JSON.stringify(res.data));
      setUsername('');
      setPwd('');
      setLoading(false);
      setUserInfo(res.data);
      setUser(res.data.username);
      setSigninSuccess(true);
      window.location.href='/appointment';
    } catch (err) {
      const status=err.response?.status;
      setLoading(false);
      if(status===401){
        setErr('Incorrect password');
      }else if(status===404){
        setErr('Username does not exsit')
      }else{
        setErr(err.response.statusText?err.response.statusText:err.message)
      }
    }
  }

return (
  <div className='max-width'>
      <div className='core form-container' >
        <h1>SignIn</h1>
        {err?<p className='err'>{err}</p>:<p></p>}
        <form className='form' onSubmit={handleSignIn}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)}></input>
          <label htmlFor='pwd'>Password</label>
          <input type='password' id='pwd' name='pwd' value={pwd} onChange={e => setPwd(e.target.value)}></input>
          <input type="submit" value="SignIn"/>
        </form>
        <p>Don't have an account?<Link to='/signup' style={{ color: 'navy' }}>SignUp</Link></p>
      </div>
  </div>
)
}

export default SignIn