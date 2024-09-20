import React, { useEffect, useState } from 'react'
import "./author.scss"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../common/modal/Modal';
import { useAuth } from '../../auth/Auth';
import Input from '../../components/form/Input';

function LoginAuthor() {
  const[contactForm, setContactForm] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({});
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const { loginUser, user, closeModal, openModal, isOpen } = useAuth()
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!contactForm.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }

    if (!contactForm.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const result = await axios.post("http://localhost:3057/author/login", contactForm)
        const response = await result.data
        
        if(!response.status){
          setModalContent({ title: response.message, body: 'Invalid credentails Please try again later.' });
          openModal()

          setContactForm({
            ...contactForm,
            password: ''
          })
        }else{
          const token = response.accessToken
          const userdata = response.message
          loginUser(token, userdata, navigate)
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
        <h2 className='heading2'>Welcome back</h2>
        <p className='body1'>Log in to your &#123;finsweet</p>

        <form action="" method="post" className='contact_form' onSubmit={handleSubmit}>

          <Input label='Enter your email address' name='email' type='email' errors={errors.email} handleFileChange={handleChange} placeholder='Email address' value={contactForm.email} />

          <Input label='Choose your password' name='password' type='password' errors={errors.password} handleFileChange={handleChange} placeholder='Choose password' value={contactForm.password} />

          <div className="forgetPassword">
            <Link to="/forgot-password" >forgot password?</Link>
          </div>

          <div className="input_submit">
            <input type="submit" value="Login" />
          </div>
        </form>

        <div className="login">
          <p>Don't have an account? <Link to="/join-author">Sign up</Link></p>
        </div>
      </div>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} title={modalContent.title} body={modalContent.body} />
      )}
    </section>
  )
}

export default LoginAuthor
