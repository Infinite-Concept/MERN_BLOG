import React from 'react'
import "./about.scss"
import team from "../../assets/image/growth-hands.png"
import why from "../../assets/image/three-persons.png"
import author from "../../assets/image/author1.png"
import facebook from "../../assets/icons/facebook.svg"
import instagram from "../../assets/icons/instagram.svg"
import linkedin from "../../assets/icons/linkedin.svg"
import twitter from "../../assets/icons/twitter.svg"
import { useNavigate } from "react-router-dom";


function About() {

    const navigate = useNavigate();

    const goToAuthor = () => {
        navigate("/join-author")
    }
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

            <div className="authors">
                <div className="title">
                    <h4 className='heading2'>List of Authors</h4>
                </div>

                <div className="items">
                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    <div className="item">
                        <img className='author' src={author} alt="" />
                        <h3 className='heading3'>Floyd Miles</h3>
                        <h4 className='body2'>Content Writer @Company</h4>
                        <div className="social">
                            <a href=""><img src={facebook} alt="" /></a>
                            <a href=""><img src={twitter} alt="" /></a>
                            <a href=""><img src={instagram} alt="" /></a>
                            <a href=""><img src={linkedin} alt="" /></a>
                        </div>
                    </div>

                    
                </div>
            </div>

            <div className="story">
                <h2 className='heading2'>Join our team to be a part of our story</h2>
                <p className='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                <button className='white_btn' onClick={goToAuthor}>Join Now</button>
            </div>
        </div>
    </section>
  )
}

export default About
