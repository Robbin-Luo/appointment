import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import './SignUp.css'
import axios from 'axios'

const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [err, setErr] = useState('');
  const {setLoading}=props;
  const confirmPwdRef = useRef();

  const validUsername = /[a-zA-Z\d_-]{8,16}/.test(username);
  const validPwd = /[a-z]/.test(pwd) && /[A-z]/.test(pwd) && /\d/.test(pwd) && /[~!@#$%&*]/.test(pwd) && pwd.length >= 8 && pwd.length <= 24;
  const validConfirmPwd = confirmPwd === pwd;
  const validEmail = /[a-zA-Z\d_-]{4,16}@[a-zA-Z\d]{2,12}.com$/.test(email);
  const validMobile = /04\d{8}/.test(mobile);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res =await axios.post('/api/signup', { username, pwd, email, mobile });
      alert(`Successfully created an account for ${res.data.username}`);
      setLoading(false);
      window.location.href='/signin';
    } catch (err) {
      console.log(err);
      const status=err.response?.status;
      setLoading(false);
      if(status===409){
        setErr('Username already exsit');
      }else if(status===500){
        setErr(err.response?.statusText)
      }else if(err.message){
        setErr(err.message);
      }
    }
  }

return (
  <div className='max-width'>
      <div className='core form-container' >
        <h1>SignUp</h1>
        {err?<p className='err'>{err}</p>:<p></p>}
        <form className='form' onSubmit={handleSignUp}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)}></input>
          <p style={validUsername || !username ? { display: 'none' } : { display: 'block' }}><ImCross /> Username should be any combinmation of lowercase letters, uppercase letters, -, _ with length between 8 and 16</p>
          <label htmlFor='pwd'>Password</label>
          <input type='password' id='pwd' name='pwd' value={pwd} onChange={e => setPwd(e.target.value)}></input>
          <p style={validPwd || !pwd ? { display: 'none' } : { display: 'block' }}><ImCross /> Password should contain at least one lowercase letter, one uppercase letter, one number , one special character, with length between 8 and 24. Allowed special character: ~, !, @, #, $, %, &amp;, *</p>
          <label htmlFor='confirm-pwd'>Confirm Password</label>
          <input type='password' id='confirm-pwd' name='confirm-pwd' ref={confirmPwdRef} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}></input>
          <p style={!validConfirmPwd && confirmPwdRef.current === document.activeElement ? { display: 'block' } : { display: 'none' }}><ImCross />Passwords should match</p>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)}></input>
          <p style={validEmail || !email ? { display: 'none' } : { display: 'block' }}><ImCross /> Invalid email address</p>
          <label htmlFor='mobile'>Mobile</label>
          <input type='text' id='mobile' name='mobile' value={mobile} onChange={e => setMobile(e.target.value)}></input>
          <p style={validMobile || !mobile ? { display: 'none' } : { display: 'block' }}><ImCross /> Mobile numbers should start 04 with a length of 10</p>
          <input className='button' type="submit" value="SignUp" disabled={!validConfirmPwd || !validEmail || !validMobile || !validPwd || !validUsername} />
        </form>
        <p>Already have an account?<Link to='/signin' style={{ color: 'navy' }}>SignIn</Link></p>
      </div>
  </div>
)
}

export default SignUp