import React, { useState } from 'react'
import "./author.scss"
import axios from "axios"
import { Link } from 'react-router-dom';

function LoginAuthor() {

    const[contactForm, setContactForm] = useState({})
    const [errors, setErrors] = useState({});
  
  const handleChange = (event) => {
    const {name, value} = event.target

    setContactForm({ ...contactForm, [name]: value })

    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!contactForm.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!contactForm.password) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(contactForm.password)) {
      errors.password = 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const result = await axios.post("http://localhost:3057/author/login", contactForm)
        
        console.log(result);

      } catch (error) {
        console.log(error);
      }
    }
  }


  return (
    <section>
      <div className="createAuthor">
        <h2 className='heading2'>Welcome back</h2>
        <p className='body1'>Log in to your &#123;finsweet</p>

        <form action="" method="post" className='contact_form' onSubmit={handleSubmit}>
          <div className="input_group">
            <input type="email" placeholder='Your Email'  className='body1' name="email" value={contactForm.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input_group">
            <input type="password" placeholder='Enter your password'  className='body1' name="password" value={contactForm.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input_submit">
            <input type="submit" value="Login" />
          </div>
        </form>

        <div className="login">
          <p>Don't have an account? <Link to="/join-author">Sign up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default LoginAuthor
