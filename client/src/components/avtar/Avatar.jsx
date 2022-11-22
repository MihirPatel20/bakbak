import React from 'react'
import avatarImage from '../../images/profile-photos/toy-6.jpg'
import './Avatar.css'

const Avatar = () => {
  return (
    <div className="Avatar">
        <img className='profile-picture' src={avatarImage} alt="" />
    </div>
  )
}

export default Avatar