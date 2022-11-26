import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../avtar/Avatar';
import './ProfileCard.css';

const ProfileCard = () => {
  const {user} = useSelector((state) => state.authReducer.authData)
  return (

    <div className="ProfileCard flex">
      <Avatar />
      <div className="info flex">
        <h4>{user.firstname} {user.lastname}</h4>
        <h5>@{user.username}</h5>
      </div>
    </div>

  )
}

export default ProfileCard