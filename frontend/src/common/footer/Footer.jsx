import React from 'react'
import logo from "../../assets/icons/Logo.svg"
import facebook from "../../assets/icons/facebook.svg"
import instagram from "../../assets/icons/instagram.svg"
import twitter from "../../assets/icons/twitter.svg"
import linkedin from "../../assets/icons/linkedin.svg"
import "./footer.css"

import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <section>
            <nav>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                <ul>
                    <li><NavLink to="">home</NavLink></li>
                    <li><NavLink to="">blog</NavLink></li>
                    <li><NavLink to="">about us</NavLink></li>
                    <li><NavLink to="">contact us</NavLink></li>
                    <li><NavLink to="/privacy">privacy policy</NavLink></li>
                </ul>
            </nav>

            <div className="subscribe">
                <div className="sub_text">
                    <p className='heading2'>Subscribe to our news letter to get latest updates and news</p>
                </div>

                <form action="">
                    <input type="email" name="email" id="email" placeholder='Enter Your Email' />
                    <input type="submit" value="Subscribe" className='white_btn'  />
                </form>
            </div>

            <div className="foot">
                <div className="footer_text">
                    <p className='body2'>Finstreet 118 2561 Fintown</p>
                    <p className='body2'>Hello@finsweet.com  020 7993 2905</p>
                </div>

                <div className="social_link">
                    <img src={facebook} alt="" />
                    <img src={twitter} alt="" />
                    <img src={instagram} alt="" />
                    <img src={linkedin} alt="" />
                </div>
            </div>
        </section>
    </footer>
  )
}

export default Footer
