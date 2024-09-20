import React, { useEffect, useState } from 'react'
import "./author.scss"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Modal from '../../common/modal/Modal';
import { useAuth } from '../../auth/Auth';
import Input from '../../components/form/Input';

function CreateAuthor() {

  const[contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm_password: '',
    profession: '',
    bio: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    file: null
  })
  const [errors, setErrors] = useState({});
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const { user, closeModal, openModal, isOpen} = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if(user.is_user_logged){
      return navigate('/')
    }
  }, [])
  
  const handleChange = (event) => {
    const {name, value} = event.target

    setContactForm({ ...contactForm, [name]: value })

    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }

  const handleFileChange = (e) => {
    setContactForm(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }))
    setErrors(prevErrors => ({ ...prevErrors, file: '' }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!contactForm.fullName) errors.fullName = 'Full Name is required';

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

    if (!contactForm.confirm_password) {
      errors.confirm_password = 'Confirm your password';
    } else if(contactForm.confirm_password !== contactForm.password){
      errors.confirm_password = 'Password do not match';
    }

    if (!contactForm.profession) {
      errors.profession = 'add your profession';
    } 

    if (!contactForm.bio) {
      errors.bio = 'add your bio';
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

    if (!contactForm.file) errors.file = 'Profile picture is required';

    if (Object.keys(errors).length > 0) {
      // If there are errors, update state to display them
      setErrors(errors);
      return;
    } else {
      // Submit form if no errors
      try {
        // Your form submission logic here
        const response = await axios.post("http://localhost:3057/author/register", contactForm, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })

        const result = await response.data
        
        if(!result.status){
          setModalContent({ title: result.message , body: 'Unable to register user' });
          openModal();
        }else{
          setModalContent({ title: result.message , body: 'Registration successful, a message has been sent to your email, verify your email before you can login' });
          setContactForm({
            fullName: '',
            email: '',
            password: '',
            confirm_password: '',
            profession: '',
            bio: '',
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            file: null
          })
          openModal();
        }

      } catch (error) {
        console.log(error);
        setModalContent({ title: error.message, body: 'An error occurred. Please try again later.' });
        openModal()
      }
    }
  }

  return (
    <section>
      <div className="createAuthor">
        <h2 className='heading2'>Create account</h2>
        <p className='body1'>join us for free</p>

        <form action="" method="post" className='contact_form' onSubmit={handleSubmit} encType="multipart/form-data">

          <Input label='Enter your full name' name='fullName' type='text' errors={errors.fullName} handleFileChange={handleChange} placeholder='Full Name' value={contactForm.fullName} />

          <Input label='Enter your email address' name='email' type='email' errors={errors.email} handleFileChange={handleChange} placeholder='Email address'  value={contactForm.email} />

          <Input label='Enter your profession' name='profession' type='text' errors={errors.profession} handleFileChange={handleChange} placeholder='Profession' value={contactForm.profession} />

          <Input label='Choose your password' name='password' type='password' errors={errors.password} handleFileChange={handleChange} placeholder='Choose password' value={contactForm.password} />

          <Input label='Confirm your password' name='confirm_password' type='password' errors={errors.confirm_password} handleFileChange={handleChange} placeholder='Confirm password' value={contactForm.confirm_password} />

          <div className="input_group">
            <label htmlFor="bio">Enter your bio</label>
            <textarea className='body1' placeholder='Bio' name="bio" id="bio" value={contactForm.bio} onChange={handleChange}></textarea>
            {errors.bio && <p className="error">{errors.bio}</p>}
          </div>

          <Input label='Enter your facebook url' name='facebook' type='url' errors={errors.facebook} handleFileChange={handleChange} placeholder='Facebook URL' value={contactForm.facebook} />

          <Input label='Enter your instagram url' name='instagram' type='url' errors={errors.instagram} handleFileChange={handleChange} placeholder='Instagram URL' value={contactForm.instagram} />

          <Input label='Enter your twitter url' name='twitter' type='url' errors={errors.twitter} handleFileChange={handleChange} placeholder='Twitter URL' value={contactForm.twitter} />

          <Input label='Enter your linkedin url' name='linkedin' type='url' errors={errors.linkedin} handleFileChange={handleChange} placeholder='Linkedin URL' value={contactForm.linkedin} />

          <div className="input_group">
            <label htmlFor="file">Choose your profile picture</label>
            <input type="file" placeholder='Linkedin link'  className='body1' name="file" onChange={handleFileChange} accept='image/png, image/jpeg' id='file'/>
            {errors.file && <p className="error">{errors.file}</p>}
          </div>

          <div className="input_submit">
            <input type="submit" value="Join Now" />
          </div>
        </form>

        <div className="login">
          <p>Already have an account? <Link to="/login-author">Log in</Link></p>
        </div>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title={modalContent.title} body={modalContent.body}  />
      )}
    </section>
  )
}

export default CreateAuthor
