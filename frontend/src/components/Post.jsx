import React from 'react'
import "./halfPost.scss"
import { NavLink } from 'react-router-dom'
import postImage from "../assets/image/postImage1.png"

function Post() {
  return (
    <div className='subPost'>
      <div className="post_image">
        <img src={postImage} alt="" />
      </div>

      <div className="post_content">
        <h4 className="cap_01">Startup</h4>
        <h5 className='body1'>By <NavLink to="">James West</NavLink> | <time datetime="">May 23, 2023</time></h5>
        <h2 className='heading2'>Design tips for designers that cover everything you need</h2>
        <p className='body1'>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
    </div>
  )
}

export default Post
