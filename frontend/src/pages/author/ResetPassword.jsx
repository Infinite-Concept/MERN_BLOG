import axios from 'axios';
import { Modal } from 'bootstrap/dist/js/bootstrap.min';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ResetPassword() {

    const {token} = useParams()

    const[reset, setReset] = useState({
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!reset.password) {
        setErrors('Password is required')
    } else if (!passwordRegex.test(reset.password)) {
      setErrors('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit');
    }else if(!reset.confirmPassword){
        setErrors('Confirm password is required');
    } else {
      try {
        let password = reset.password
        const result = await axios.post("http://localhost:3057/author/forgot-password", {password})
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
      setReset({
        password: "",
        confirmPassword: ""
      })
  };

  return (
    <section>
      <div className="createAuthor">
        <h2 className='heading2'>Reset your password</h2>
        <p className='body1'>Reset your &#123;finsweet password below. </p>

        <form action="" method="post" className='contact_form' onSubmit={handleSubmit}>
          <div className="input_group">
            <input type="email" placeholder='Choose your password'  className='body1' name={reset.password} value={reset.password} onChange={(e) => setReset({...reset, password: e.target.value })} />
          </div>

          <div className="input_group">
            <input type="email" placeholder='Confirm your password'  className='body1' name={reset.confirmPassword} value={reset.confirmPassword} onChange={(e) => setReset({...reset, confirmPassword: e.target.value })} />
            {errors && <p className="error">{errors}</p>}
          </div>

          <div className="input_submit reset_submit">
            <input type="submit" value="Reset password" />
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

export default ResetPassword