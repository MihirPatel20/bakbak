import React from 'react';
import { useSelector } from 'react-redux';
import './Avatar.css';

const Avatar = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="Avatar">
      <img className='profile-picture'
        src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"}
        alt=""
      />
    </div>
  )
}

export default Avatar