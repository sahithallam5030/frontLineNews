import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import '../css/Login.css'

function Login() {
  let {register,handleSubmit}=useForm();
  const [type,setType]=useState('password');
  const [icon,setIcon]=useState(FaRegEye);

  const onTogglePassword=()=>{
    if(type==='password'){
      setType('text');
      setIcon(FaRegEyeSlash);
    }
    else{
      setType('password');
      setIcon(FaRegEye);
    }
  }
  const onFormSubmit=(data)=>{
    console.log(data);
  }

  return (
    <div>
      <div id="outer-signup">
          <div id="inner-signup">
            <h3 className='text-center'>Login</h3>
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="inputs">
                <div className="input-fields">
              <input type="email" name="email" id="email" {...register('email',{required:true})} required/>
              <p>Email</p>
              <span className="icon"><IoMailOutline/></span>
              </div>
            </div>
            <div className="inputs">
              <div className="input-fields">
              <input type={type} name="pswd" id="pswd" {...register('password',{required:true})} required/>
              <p>Password</p>
              <span className="icon p-icon" onClick={onTogglePassword}>{icon}</span>
              </div>
            </div>
              <div id="submit-btn">
                <button type="submit">Login</button>
              </div>
              <p className='text-center mt-2'>Don't have account? <Link to='/signup' className='text-decoration-none'>Signup</Link></p>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Login
