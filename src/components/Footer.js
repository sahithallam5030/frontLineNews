import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { MdMail } from "react-icons/md";
import {useSelector} from 'react-redux'

function Footer() {
  let {newsSuccess,newsLoading}=useSelector(state=>state.news);
  if(newsSuccess===true || newsLoading===true){
    let footer=document.getElementById('outer-footer');
    footer.style.position='relative';
  }
  return (
    <div id='outer-footer'>
        <div id="footer-section" className='container'>
            <div id="personal">
            <p><FaLocationDot /> Hyderabad</p>
            <p><IoMdCall /> +91 9059778895</p>
            <p><MdMail /> sahithallam5030@gmail.com</p>
            </div>
            <div id="website-details">
              <h5>About the website</h5>
              <p>Your trusted source for breaking news and in-depth analysis. Stay ahead of the curve with our comprehensive coverage of global events and local stories. Experience the forefront of journalism with Frontline News.</p>
            </div>
        </div>
    </div>
  )
}

export default Footer
