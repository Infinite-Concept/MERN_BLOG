import React from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../auth/Auth';
import "./jointeam.scss"

function JoinTeams() {
  const navigate = useNavigate();
  const {user} = useAuth()

  const goToAuthor = () => {
    navigate("/join-author")
  }

  if(user.is_user_logged){
    return
  }

  return (
    <div className='jointeams'>
      <div className="story">
            <h2 className='heading2'>Join our team to be a part of our story</h2>
            <p className='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <button className='white_btn' onClick={goToAuthor}>Join Now</button>
        </div>
    </div>
  )
}

export default JoinTeams
