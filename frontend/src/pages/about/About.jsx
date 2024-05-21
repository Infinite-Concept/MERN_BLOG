import React from 'react'
import "./about.scss"
import team from "../../assets/image/growth-hands.png"
import why from "../../assets/image/three-persons.png"

import JoinTeams from '../../common/join teams/JoinTeams'
import ListAuthor from '../../common/author/ListAuthor'


function About() {

    
  return (
    <section>
        <div className="aboutus">
            <div className="about_first">
                <div className="first_text">
                    <h3 className='cap_03'>ABOUT US</h3>
                    <h2 className='heading1'>
                    We are a team of content writers who share their learnings
                    </h2>
                </div>

                <div className="second_text">
                    <p className='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>

            <div className="banner">
                <div className="content">
                    <div className="inner">
                        <div className="inner_text">
                            <h3 className='display'>12+</h3>
                            <p className='body1'>Blogs Published</p>
                        </div>

                        <div className="inner_text">
                            <h3 className='display'>18K+</h3>
                            <p className='body1'>Views on Finsweet</p>
                        </div>

                        <div className="inner_text">
                            <h3 className='display'>30K+</h3>
                            <p className='body1'>Total active Users</p>
                        </div>
                    </div>

                    <div className="line">
                        <span className="line"></span>
                        <span className="line1"></span>
                    </div>
                </div>
            </div>

            <div className="mission">
                <div className="vision">
                    <h3 className='cap_01'>
                        Our mision
                    </h3>
                    <h2 className='heading3'>
                        Creating valuable content for creatives all around the world
                    </h2>
                    <p className='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.
                    </p>
                </div>

                <div className="vision">
                    <h3 className='cap_01'>
                        Our Vision
                    </h3>
                    <h2 className='heading3'>
                        A platform that empowers individuals to improve
                    </h2>
                    <p className='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.
                    </p>
                </div>
            </div>

            <div className="team">
                <div className="content">
                    <h2 className='heading2'>
                        Our team of creatives
                    </h2>

                    <h3 className='heading4'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                    </h3>

                    <p className='body1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                    </p>
                </div>

                <div className="image">
                    <img src={team} alt="team growth" />
                </div>

                <div className="shapes"></div>
            </div>

            <div className="why">
                <div className="why_image">
                    <img src={why} alt="" />
                </div>

                <div className="why_content">
                    <h2 className='heading2'>Why we started this Blog</h2>
                    <h3 className='heading4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h3>
                    <p className='body1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                    </p>
                </div>
            </div>

            <ListAuthor />

            <JoinTeams />
            
        </div>
    </section>
  )
}

export default About
