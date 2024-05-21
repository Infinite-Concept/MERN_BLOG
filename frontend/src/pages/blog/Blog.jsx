import React from 'react'
import JoinTeams from '../../common/join teams/JoinTeams'
import Category from '../../common/category/Category'
import "./blog.scss"
import Post from '../../components/Post'
import { NavLink } from 'react-router-dom'
import blogBanner from "../../assets/image/blogBanner.png"

function Blog() {
  return (
    <div className="blogPage">

      <div className="blogHomepage">
        <div className="blogHomepage_content">
          <div className="part1">
            <h4 className='cap_03'>Featured Post</h4>
            <h2 className='heading2'>Step-by-step guide to choosing great font pairs</h2>
            <h5 className='body1'>By <NavLink to="">James West</NavLink> | <time datetime="">May 23, 2023</time></h5>

            <p className='body1'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

            <button className='white_btn'>Read More &gt; </button>
          </div>

          <div className="blogHomepage_image">
            <img src={blogBanner} alt="" />
          </div>
        </div>
      </div>

      <section className="blogPageWrapper">

        
        <div className="postBlog">
          <h2 className='heading2 post_head'>All posts</h2>

          <div className="postContiner_blog">
            <Post />
            <Post />
            <Post />
          </div>
        </div>

        <div className="category">
          <h2 className='heading2' id='blogcategory'>All Category</h2>

          <Category />
        </div>

        <JoinTeams />
      </section>
    </div>
  )
}

export default Blog
