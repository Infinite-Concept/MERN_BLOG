import React from 'react'

function Input({label, name, type, errors, handleFileChange, placeholder, value}) {
  return (
    <div className="input_group">
        <label htmlFor={name} >{label}</label>
        <input type={type} placeholder={placeholder}  className='body1' name={name} onChange={handleFileChange} id={name} value={value}/>
        {errors && <p className="error">{errors}</p>}
    </div>
  )
}

export default Input