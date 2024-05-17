import React, { useState } from 'react'
import axios from "axios"
import "./contact.scss"
import Modal from '../../common/modal/Modal'

function Contact() {

  const[contactForm, setContactForm] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setContactForm(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.post("http://localhost:3057/contact/form/data", contactForm)

      console.log(response);
      if (response.status == 400) {
        // Set modal content for success
        
        setModalContent({ title: response.data.message , body: 'Unable to send message' });
        openModal();
        
      } if(response.code === "ERR_NETWORK"){
        setModalContent({ title: response.code, body: response.message });
        openModal();
      }else {
        setModalContent({ title: response.data.message , body: "your message have been send" });
        openModal();
        
      }
      
    } catch (error) {
      console.log(error);
      // Set modal content for error
      setModalContent({ title: 'Error', body: 'An error occurred. Please try again later.' });
      // Show the modal
      openModal()
    }
  }

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
      setIsOpen(false);
      setContactForm({
        fullName: "",
        email: "",
        subject: "",
        message: ""
      })
  };

  return (
    <section className='contact'>

      <div className="contact_container">
        <div className="contact_jumbtrom">
          <h3 className='cap_03'>Contact us</h3>
          <h1 className='heading1'>Let’s Start a Conversation</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
          </p>
        </div>

        <div className="contact_hours">
          <div className="inner">
            <div className="inner_hours">
              <p className='body2'>Working hours</p>
            </div>

            <h3 className='heading5'>Monday To Friday</h3>
            <h3 className='heading5'>9:00 AM to 8:00 PM </h3>
            <big className='body1'>Our Support Team is available 24/7</big>
          </div>

          <div className="inner">
            <div className="inner_hours">
              <p className='body2'>Contact Us</p>
            </div>

            <h3 className='heading5'>020 7993 2905</h3>
            <big className='body1'>hello@finsweet.com</big>
          </div>
        </div>

        <form action="" className='contact_form' onSubmit={handleSubmit}>
          <div className="input_group">
            <input type="text" placeholder='Full Name' required className='body1' name="fullName" value={contactForm.fullName} onChange={handleChange} />
          </div>

          <div className="input_group">
            <input type="text" placeholder='Your Email' required className='body1' name="email" value={contactForm.email} onChange={handleChange} />
          </div>

          <div className="input_group">
            <input type="text" placeholder='Subject' required className='body1' name="subject" value={contactForm.subject} onChange={handleChange} />
          </div>

          <div className="input_group">
            <textarea id="" placeholder='Message' className='body1' name="message" value={contactForm.message} onChange={handleChange} ></textarea>
          </div>

          <div className="input_submit">
            <input type="submit" value="Send Message"/>
          </div>
        </form>
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

export default Contact
