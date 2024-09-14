import React, { useEffect, useState } from 'react'
import "./author.scss"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../common/modal/Modal';
import { useAuth } from '../../auth/Auth';

function LoginAuthor() {
  const[contactForm, setContactForm] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const { loginUser, user } = useAuth()
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

  const closeModal = () => {
    setIsOpen(false);
    setContactForm({
      ...contactForm,
      password: ''
    })
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
          console.log(response);
        }else{
          const userdata = response.accessToken
          loginUser(userdata)
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
          <div className="input_group">
            <input type="email" placeholder='Your Email'  className='body1' name='email' value={contactForm.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input_group">
            <input type="password" placeholder='Enter your password'  className='body1' name='password' value={contactForm.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

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
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h2>{modalContent.title}</h2>
          <p>{modalContent.body}</p>
        </Modal>
      )}
    </section>
  )
}

export default LoginAuthor
