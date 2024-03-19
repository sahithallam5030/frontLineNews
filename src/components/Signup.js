import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios';
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
import '../css/Login.css'

function Signup() {
  let {register,handleSubmit}=useForm();
  const [type,setType]=useState('password');
  const [icon,setIcon]=useState(FaRegEye)
  const navigate=useNavigate();

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
    axios.post("/users/create-user",data)
    .then((response)=>{
        let data=response.data;
        if(data.message==="Account Created Successfully"){
          alert(data.message);
        navigate('/login');
        }
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div>
        <div id="outer-signup">
          <div id="inner-signup">
            <h3 className='text-center'>Signup</h3>
            <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="inputs username">
              <div className="input-fields">
                <input type="text" name="fname" id="fname" {...register('firstname')} required/>
                <p>Firstname</p>
                </div>
             <div className="input-fields">
                <input type="text" name="lname" id="lname" {...register('lastname')} required/>
              <p>Lastname</p>
                </div>
                </div>
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
                <button type="submit">Create Account</button>
              </div>
              <p className='text-center mt-2'>Already have account? <Link to='/login' className='text-decoration-none'>Login</Link></p>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Signup
