import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './header.css'
import logo from "../../assets/icons/Logo.svg"
import { useAuth } from '../../auth/Auth'

function Header() {
    const { user, baseURL, logout } = useAuth()
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const profilePic = `${baseURL}${user?.user?.file}`
    const navigate = useNavigate()
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        // return () => {
        //   document.removeEventListener("mousedown", handleClickOutside);
        // };
    }, []);

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

            <div>
                {user.is_user_logged 
                    ? 
                    <div className="relative">
                        <button
                            className={`flex items-center px-3 py-2 focus:outline-none hover:bg-gray-200 hover:rounded-md hover-text-custom ${
                            open ? "bg-gray-200 rounded-md hover-text" : ""
                            }`}
                            type="button"
                            onClick={() => setOpen(!open)}
                            aria-expanded={open}
                        >
                            <img
                            src={profilePic}
                            alt="Profile"
                            className="h-8 w-8 rounded-full"
                            />
                            <span className="ml-4 text-sm hidden md:inline-block">{user?.user?.fullName}</span>
                            <svg className="fill-current w-3 ml-4" viewBox="0 0 407.437 407.437">
                            <path
                                d="M386.258 91.567l-182.54 181.945L21.179 91.567 0 112.815 203.718 315.87l203.719-203.055z"
                            />
                            </svg>
                        </button>

                        {open && (
                            <div
                            ref={dropdownRef}
                            className="text-sm absolute top-0 right-0 mt-16 mr-4 bg-white rounded border border-gray-400 shadow headerNavDrop"
                            style={{ zIndex: 10 }}
                            >
                            <ul>
                                <li >
                                    <Link to="/profile" className="px-4 py-3 border-b hover:bg-gray-200">My Profile</Link>
                                </li>
                                <li>
                                    <Link to="/createblog" className="px-4 py-3 border-b hover:bg-gray-200" >Create Post</Link>
                                </li>
                                <li>
                                    <Link to="/listblog" className="px-4 py-3 border-b hover:bg-gray-200">List Post</Link>
                                </li>
                                <li>
                                    <button onClick={() => logout(navigate)} className="px-4 py-3 border-b hover:bg-gray-200">Log out</button>
                                </li>
                            </ul>
                            </div>
                        )}
                    </div>
                    : 
                <p className="white_btn">Subscribe</p>
                }
            </div>
        </div>
        </header>
    </section>
    </div>
  )
}

export default Header
