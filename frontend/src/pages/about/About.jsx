import React from 'react'

function About() {
  return (
    <section>
        <div className="aboutus">
            <div className="about_first">
                <div className="first_text">
                    <h3>ABOUT US</h3>
                    <h2>
                    We are a team of content writers who share their learnings
                    </h2>
                </div>

                <div className="second_text">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>

            <div className="banner">
                <div className="content">
                    <div className="inner">
                        <div className="inner_text">
                            <h3>12+</h3>
                            <p>Blogs Published</p>
                        </div>

                        <div className="inner_text">
                            <h3>18K+</h3>
                            <p>Views on Finsweet</p>
                        </div>

                        <div className="inner_text">
                            <h3>30K+</h3>
                            <p>Total active Users</p>
                        </div>
                    </div>

                    <div className="line">
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About
