import React from 'react'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Modal({ isOpen, onClose, children }) {

    const overlayStyle = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
      };
    
      const modalStyle = {
        display: isOpen ? 'block' : 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        zIndex: 1000,
      };

  return (
    <div>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <button onClick={onClose} style={{textAlign: "right", background: "transparent", marginBottom: "20px", display: "flex", justifyContent: "end", alignItems: "end"}}><FontAwesomeIcon icon={faXmark} size='lg' /></button>
        {children}
      </div>
    </div>
  )
}

export default Modal
