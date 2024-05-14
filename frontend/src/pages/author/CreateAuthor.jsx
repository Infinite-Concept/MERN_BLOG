import React, { useState } from 'react'
import "./author.scss"
import { Link } from 'react-router-dom';

function CreateAuthor() {

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

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!contactForm.fullName) {
      errors.fullName = 'Full Name is required';
    }

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

    if (!contactForm.profession) {
      errors.profession = 'add your profession';
    } 

    if (!contactForm.facebook) {
      errors.facebook = 'facebook link is required';
    } else if(contactForm.facebook && !urlRegex.test(contactForm.facebook)) {
      errors.facebook = 'Facebook URL is invalid';
    }

    if (!contactForm.instagram) {
      errors.instagram = 'instagram link is required';
    } else if (contactForm.instagram && !urlRegex.test(contactForm.instagram)) {
      errors.instagram = 'Instagram URL is invalid';
    }

    if (!contactForm.twitter) {
      errors.twitter = 'twitter link is required';
    }  else if (contactForm.twitter && !urlRegex.test(contactForm.twitter)) {
      errors.twitter = 'Twitter URL is invalid';
    }

    if (!contactForm.linkedin) {
      errors.linkedin = 'linkedin link is required';
    } else if (contactForm.linkedin && !urlRegex.test(contactForm.linkedin)) {
      errors.linkedin = 'LinkedIn URL is invalid';
    }

    if (!contactForm.file) {
      errors.file = 'add a profile pic';
    } 

    if (Object.keys(errors).length > 0) {
      // If there are errors, update state to display them
      setErrors(errors);
    } else {
      // Submit form if no errors
      try {
        // Your form submission logic here
        console.log(contactForm);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section>
      <div className="createAuthor">
        <h2 className='heading2'>Create account</h2>
        <p className='body1'>join us for free</p>

        <form action="" method="post" className='contact_form' onSubmit={handleSubmit}>
          <div className="input_group">
            <input type="text" placeholder='Full Name'  className='body1' name="fullName" value={contactForm.fullName} onChange={handleChange} />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="input_group">
            <input type="email" placeholder='Your Email'  className='body1' name="email" value={contactForm.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input_group">
            <input type="password" placeholder='Enter your password'  className='body1' name="password" value={contactForm.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input_group">
            <input type="text" placeholder='Profession'  className='body1' name="profession" value={contactForm.subject} onChange={handleChange} />
            {errors.profession && <p className="error">{errors.profession}</p>}
          </div>

          <div className="input_group">
            <input type="url" placeholder='Facebook link'  className='body1' name="facebook" value={contactForm.facebook} onChange={handleChange} />
            {errors.facebook && <p className="error">{errors.facebook}</p>}
          </div>

          <div className="input_group">
            <input type="url" placeholder='Instagram link'  className='body1' name="instagram" value={contactForm.instagram} onChange={handleChange} />
            {errors.instagram && <p className="error">{errors.instagram}</p>}
          </div>

          <div className="input_group">
            <input type="url" placeholder='twitter link'  className='body1' name="twitter" value={contactForm.twitter} onChange={handleChange} />
            {errors.twitter && <p className="error">{errors.twitter}</p>}
          </div>

          <div className="input_group">
            <input type="url" placeholder='Linkedin link'  className='body1' name="linkedin" value={contactForm.linkedin} onChange={handleChange} />
            {errors.linkedin && <p className="error">{errors.linkedin}</p>}
          </div>

          <div className="input_group">
            <input type="file" placeholder='Linkedin link'  className='body1' name="file" value={contactForm.file} onChange={handleChange} accept='.png, .jpeg'/>
            {errors.file && <p className="error">{errors.file}</p>}
          </div>

          <div className="input_submit">
            <input type="submit" value="Join now" />
          </div>
        </form>

        <div className="login">
          <p>Already have an account? <Link to="/login-author">Log in</Link></p>
        </div>
      </div>
    </section>
  )
}

export default CreateAuthor
