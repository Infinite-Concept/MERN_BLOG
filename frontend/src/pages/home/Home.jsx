import React from 'react'
import "./home.scss"
import JoinTeams from '../../common/join teams/JoinTeams'
import arrowFirst from "../../assets/icons/arrow1.svg"
import arrowSecond from "../../assets/icons/arrow2.svg"
import testiImage from "../../assets/image/review1.svg"

// logo component
import logoComp1 from "../../assets/icons/Logo1.svg"
import logoComp2 from "../../assets/icons/Logo2.svg"
import logoComp3 from "../../assets/icons/Logo3.svg"
import logoComp4 from "../../assets/icons/Logo4.svg"
import logoComp5 from "../../assets/icons/Logo5.svg"
import logoComp6 from "../../assets/icons/Logo6.svg"

import startedImage from "../../assets/image/started.png"

import Category from '../../common/category/Category'


function Home() {
  return (
    <section className='homePage'>
      <div className="homePageWrapper">

        <div className="aims">
          <div className="aims_sider"></div>

          <div className="aims_content">
            <div className="aims_inner">
              <h4 className='cap_01'>about us</h4>
              <h2 className='heading2'>
                We are a community of content writers who share their learnings
              </h2>
              <p className='body1'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <a href="">read more &gt; </a>
            </div>

            <div className="aims_inner">
              <h4>Our mision</h4>
              <h2>
              Creating valuable content for creatives all around the world
              </h2>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>

        <div className="category">
          <h2 className='heading2'>Choose A Category</h2>

          <Category />
        </div>

        <div className="started">
          <div className="started_image">
            <img src={startedImage} alt="" />
          </div>

          <div className="started_content">
            <h4 className='cap_01'>Why we started </h4>
            <h2 className='heading1'>It started out as a simple idea and evolved into our passion</h2>
            <p className='body1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>

            <button className='white_btn'>Discover our story &nbsp; &gt; </button>
          </div>
        </div>

        <div className="logoComponent">
          <img src={logoComp6} alt="company logo" />
          <img src={logoComp1} alt="company logo" />
          <img src={logoComp2} alt="company logo" />
          <img src={logoComp3} alt="company logo" />
          <img src={logoComp4} alt="company logo" />
          <img src={logoComp5} alt="company logo" />
        </div>

        <div className="testimonials">
          <div className="testi1">
            <h4 className='cap_01'>testimonials</h4>
            <h2 className='heading2'>What people say about our blog</h2>
            <p className='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
          </div>

          <div className="testi2"></div>

          <div className="testi3">
            <h3 className='heading4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h3>

            <div className="inner_testi3">
              <div className="testi_image">
                <img src={testiImage} alt="" />

                <div className="testi_image_content">
                  <h3 className='heading4'>Jonathan Vallem</h3>
                  <h2 className='body1'>New york, USA</h2>
                </div>
              </div>

              <div className="arrow_button">
                <div className="arr1">
                  <img src={arrowSecond} alt="" />
                </div>
                <div className="arr1 arrDiff">
                  <img src={arrowFirst} alt="" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <JoinTeams />
      </div>
    </section>
  )
}

export default Home
