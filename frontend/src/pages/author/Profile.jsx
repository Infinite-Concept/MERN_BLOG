import React, { useState } from 'react'
import { useAuth } from '../../auth/Auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Input from '../../components/form/Input';
import axios from 'axios';

function Profile() {

  const {user, baseURL, setUser} = useAuth()
  let author = user.user
  const [showEdit, setShowEdit] = useState(true)
  const[profileData, setProfileData] = useState({
    fullName: author.fullName,
    profession: author.profession,
    bio: author.bio,
    facebook: author.social.facebook,
    instagram: author.social.instagram,
    twitter: author.social.twitter,
    linkedin: author.social.linkedin,
    file: ''
  })

  const[changePassword, setChangePassword] = useState({
    old_password: '',
    password: '',
    confirm_password: ''
  })

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({
    status: false,
    message : '',
    stat: false
  });

  const handleChange = (event) => {
    const {name, value} = event.target

    setProfileData({ ...profileData, [name]: value })

    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }

  const handlePasswordChange = (event) => {
    const {name, value} = event.target

    setChangePassword({ ...changePassword, [name]: value })

    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }

  const handleFileChange = (e) => {
    setProfileData(prevData => ({
      ...prevData,
      file: e.target.files[0]
    }))
    setErrors(prevErrors => ({ ...prevErrors, file: '' }));
  }

  const showHandle = () => {
    setShowEdit(false)
  }

  const hideHandle = () => {
    setShowEdit(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!profileData.fullName) errors.fullName = 'Full Name is required';

    if (!profileData.profession) {
      errors.profession = 'add your profession';
    } 

    if (!profileData.bio) {
      errors.bio = 'add your bio';
    } 

    if (!profileData.facebook) {
      errors.facebook = 'facebook link is required';
    } else if(profileData.facebook && !urlRegex.test(profileData.facebook)) {
      errors.facebook = 'Facebook URL is invalid';
    }

    if (!profileData.instagram) {
      errors.instagram = 'instagram link is required';
    } else if (profileData.instagram && !urlRegex.test(profileData.instagram)) {
      errors.instagram = 'Instagram URL is invalid';
    }

    if (!profileData.twitter) {
      errors.twitter = 'twitter link is required';
    }  else if (profileData.twitter && !urlRegex.test(profileData.twitter)) {
      errors.twitter = 'Twitter URL is invalid';
    }

    if (!profileData.linkedin) {
      errors.linkedin = 'linkedin link is required';
    } else if (profileData.linkedin && !urlRegex.test(profileData.linkedin)) {
      errors.linkedin = 'LinkedIn URL is invalid';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      try {
        // Create a FormData object to handle file and other data
        const formData = new FormData();
        
        // Append form fields to the FormData object
        formData.append("id", author._id);
        formData.append("fullName", profileData.fullName || author.fullName);
        formData.append("profession", profileData.profession || author.profession);
        formData.append("bio", profileData.bio || author.bio);
        formData.append("facebook", profileData.facebook || author.social.facebook);
        formData.append("instagram", profileData.instagram || author.social.instagram);
        formData.append("twitter", profileData.twitter || author.social.twitter);
        formData.append("linkedin", profileData.linkedin || author.social.linkedin);

        // If there is a file, append it to FormData
        if (profileData.file) {
            formData.append("file", profileData.file);
        }

        const response = await axios.put(`${baseURL}author/profile`, formData, {
          headers: {
            'Content-Type': "multipart/form-data"
          }
        })

        const result = await response.data

        console.log(result);
        if(!result.status){
          setPasswordErrors({
            status: true,
            message : result.message,
            stat: false
          })
        }else{
          setPasswordErrors({
            status: true,
            message : result.message,
            stat: true
          })

          setUser({
            ...user,
            user: result.user
          })

          setTimeout(() => {
            hideHandle();
            setPasswordErrors({
              status: false,
              message: '',
              stat: false
            });
          }, 1500);
        }

      } catch (error) {
        console.log(error);
        setPasswordErrors({
          status: true,
          message : 'Unable to connect. Try again later!',
          stat: false
        })
      }
    }
  }

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if(!changePassword.old_password){
      errors.old_password = 'Old password is required';
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!changePassword.password) {
      errors.password = 'Password is required';
    } else if (!passwordRegex.test(changePassword.password)) {
      errors.password = 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit';
    }

    if (!changePassword.confirm_password) {
      errors.confirm_password = 'Confirm your password';
    } else if(changePassword.confirm_password !== changePassword.password){
      errors.confirm_password = 'Password do not match';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    } else {
      // Submit form if no errors
      try {
        // Your form submission logic here

        const updatedProfile = {
          id: author._id,
          old_password: changePassword.old_password,
          password: changePassword.password,
          confirm_password: changePassword.confirm_password
        };
        const response = await axios.put(`${baseURL}author/password`, updatedProfile )

        const result = await response.data

        console.log(result);
        
        if(!result.status){
          setPasswordErrors({
            status: true,
            message : result.message,
            stat: false
          })
        }else{
          setPasswordErrors({
            status: true,
            message : result.message,
            stat: true
          })
          setChangePassword({
            old_password: '',
            password: '',
            confirm_password: ''
          })

          setTimeout(() => {
            setPasswordErrors({
              status: false,
              message: '',
              stat: false
            });
          }, 1500);
        }

      } catch (error) {
        console.log(error);
        setPasswordErrors({
          status: true,
          message : 'Unable to connect. Try again later!',
          stat: false
        })
      }
    }
  }
  
  return (
    <section>
      <div className="authorProfile">

        {
          showEdit ? 
            <div className="container mt-4 mb-4 p-3 d-flex justify-content-center"> 
              <div className="card p-4"> 
              <div className=" image d-flex flex-column justify-content-center align-items-center">  
                <button className="btn btn-secondary container_profileImage"> 
                  <img className='profileImage' src={baseURL+author.file} alt={author.fullName} />
                </button> 
                <span className="name mt-3">{author.fullName}</span> 
                <span className="idd">{author.profession}</span> 
                <div className="d-flex flex-row justify-content-center align-items-center gap-2"> 
                  <span className="idd1">{author.email}</span>
                </div> 
          
                <div className="text mt-3"> 
                  <span>{author.bio}</span> 
                </div> 
                <div className="gap-3 my-3 icons d-flex flex-row justify-content-center align-items-center"> 
                  <span>
                    <a href={author.social.instagram} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </span>
                  <span>
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </span>
                  <span>
                    <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </span>
                  <span>
                    <a href={author.social.facebook} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                  </span>
                </div> 
                
                <div className=" d-flex mt-2"> 
                  <button className="btn1 btn-dark" onClick={showHandle}>Edit Profile</button> 
                </div> 

                <div className='change_password'>
                  <button data-bs-toggle="modal" data-bs-target="#exampleModal">Change password</button>
                </div>

                <div className=" px-2 rounded mt-4 date "> 
                  <span className="join">Joined {new Date(author.createdDate).toDateString()}</span> 
                </div> 
              </div> 
              </div>
            </div>
          : 
            <div className='createAuthor'>
              <div className="goBack" onClick={hideHandle}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <h2 className='heading2'>Edit your Profile</h2>
              <form action="" method="post" className='contact_form' encType="multipart/form-data" onSubmit={handleSubmit}>

                {passwordErrors.status && (
                  <p className={`alert ${passwordErrors.stat ? 'alert-success' : 'alert-danger'} text-capitalize`}>
                    {passwordErrors.message}
                  </p>
                )}
                <Input label='Enter your full name' name='fullName' type='text' errors={errors.fullName} handleFileChange={handleChange} placeholder='Full Name' value={profileData.fullName} />

                <Input label='Enter your profession' name='profession' type='text' errors={errors.profession} handleFileChange={handleChange} placeholder='Profession' value={profileData.profession} />

              <div className="input_group">
                <label htmlFor="bio">Enter your bio</label>
                <textarea className='body1' placeholder='Bio' name="bio" id="bio" value={profileData.bio} onChange={handleChange}></textarea>
                {errors.bio && <p className="error">{errors.bio}</p>}
              </div>

              <Input label='Enter your facebook url' name='facebook' type='url' errors={errors.facebook} handleFileChange={handleChange} placeholder='Facebook URL' value={profileData.facebook} />

              <Input label='Enter your instagram url' name='instagram' type='url' errors={errors.instagram} handleFileChange={handleChange} placeholder='Instagram URL' value={profileData.instagram} />

              <Input label='Enter your twitter url' name='twitter' type='url' errors={errors.twitter} handleFileChange={handleChange} placeholder='Twitter URL' value={profileData.twitter} />

              <Input label='Enter your linkedin url' name='linkedin' type='url' errors={errors.linkedin} handleFileChange={handleChange} placeholder='Linkedin URL' value={profileData.linkedin} />

              <div className="input_group">
                <label htmlFor="file">Choose your profile picture</label>
                <input type="file" placeholder='Linkedin link'  className='body1' name="file" onChange={handleFileChange} accept='image/png, image/jpeg' id='file'/>
                {errors.file && <p className="error">{errors.file}</p>}
              </div>

              <div className="input_submit">
                <input type="submit" value="Edit Profile" />
              </div>
              </form>
            </div>
        }

        <div className="modal fade profileModal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='createAuthor'>
                  {passwordErrors.status && (
                    <p className={`alert ${passwordErrors.stat ? 'alert-success' : 'alert-danger'} text-capitalize`}>
                      {passwordErrors.message}
                    </p>
                  )}
                  <form action="" method="post" className='contact_form' onSubmit={handlePasswordSubmit}>
                    <Input label='Enter Old password' name='old_password' type='password' errors={errors.old_password} handleFileChange={handlePasswordChange} placeholder='Old Password' value={changePassword.old_password} />
                    <Input label='Choose password' name='password' type='password' errors={errors.password} handleFileChange={handlePasswordChange} placeholder='Choose Password' value={changePassword.password} />
                    <Input label='Confirm your password' name='confirm_password' type='password' errors={errors.confirm_password} handleFileChange={handlePasswordChange} placeholder='Confirm Password' value={changePassword.confirm_password} />
                    <div className='white_btn--container'>
                      <input type="submit" value='Change Password' className="white_btn" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile