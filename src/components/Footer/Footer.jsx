import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className="footer-content-left">
                 <img src={assets.logo} alt='' className='logo'/>
                 <p>Lorem ipsum dolor sit amet consecm perspiciatis consequuntur. Eius reprehenderit libero iure suscipit commodi sunt.</p>
                 <div className='footer-social-icons'>
                 <FaFacebook />
                 <FaTwitter />
                 </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Privacy Policy</li>
                </ul>
             </div>
            
            <div className="footer-content-right">
               <h2>Get More Info</h2>
               <ul>
                <li>+977 9847890122</li>
                <li>Contactus@gmail.com</li>
                </ul> 
            </div>
        </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 . Voxpoll.com ALL RIGHT RESERVED</p>
    </div>
  )
}

export default Footer
