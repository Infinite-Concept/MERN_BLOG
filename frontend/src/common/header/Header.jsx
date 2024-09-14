import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.css'
import logo from "../../assets/icons/Logo.svg"
import { useAuth } from '../../auth/Auth'

function Header() {

    const { user } = useAuth()
  return (
    <div className="header">
        <section>
        <header>
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>

        <div className="menu_list">
            <ul className='menu_list-Ul'>
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
                {user.is_user_logged ? <Link to='/createblog'>Create Post</Link> : <p>Subscribe</p>}
            </div>
        </div>
        </header>
    </section>
    </div>
  )
}

export default Header
