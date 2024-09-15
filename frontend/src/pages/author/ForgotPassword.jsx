import React, { useState } from 'react'
import "./author.scss"
import axios from "axios"
import { Link } from 'react-router-dom';
import Modal from '../../common/modal/Modal';

function ForgotPassword() {

    const[email, setEmail] = useState('')
    const [errors, setErrors] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
        setErrors('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors('Email is invalid');
    } else {
      try {
        const result = await axios.post("http://localhost:3057/author/forgot-password", {email})
        const response = await result.data
        console.log(result);

        if(!response.status){
            setModalContent({ title: response.message , body: 'Invalid credentials' });
        }else{
            setModalContent({ title: response.message , body: 'An email has been sent to your mail, confirm and proceed with you change of password' });
        }
        openModal();

      } catch (error) {
        console.log(error);
        setModalContent({ title:  "Request failed" , body: error.response.data.message });
        openModal();
      }
    }
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
      setIsOpen(false);
      setEmail('')
  };

  return (
    <section>
      <div className="createAuthor">
        <h2 className='heading2'>Forgot your password</h2>
        <p className='body1'>Forgot your &#123;finsweet password? Insert your credentials below. </p>

        <form action="" method="post" className='contact_form' onSubmit={handleSubmit}>
          <div className="input_group">
            <input type="email" placeholder='Your Email'  className='body1' name={email} value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors && <p className="error">{errors}</p>}
          </div>

          <div className="input_submit">
            <input type="submit" value="Forgot password" />
          </div>
        </form>

        <div className="login">
          <p>Back to <Link to="/login-author">Login</Link></p>
        </div>
      </div>

      {/* Modal  */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h2>{modalContent.title}</h2>
          <p>{modalContent.body}</p>
        </Modal>
      )}
    </section>
  )
}

export default ForgotPassword
