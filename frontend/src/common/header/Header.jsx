import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'
import logo from "../../assets/icons/Logo.svg"

function Header() {
  return (
    <div className="header">
        <section>
        <header>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>

        <div className="menu_list">
            <ul>
                <li>
                    <NavLink className="a" to="/" >home</NavLink>
                </li>

                <li>
                    <NavLink className="a" to="/blog" >blog</NavLink>
                </li>

                <li>
                    <NavLink className="a" to="/about" >About us</NavLink>
                </li>

                <li>
                    <NavLink className="a" to="/contact" >contact us</NavLink>
                </li>
            </ul>

            <div className="white_btn">
                <p>Subscribe</p>
            </div>
        </div>
        </header>
    </section>
    </div>
  )
}

export default Header
