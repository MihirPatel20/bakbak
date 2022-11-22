import React from 'react'
import Avatar from '../avtar/Avatar'
import './ProfileCard.css'

const ProfileCard = () => {
  return (
    <div className="ProfileCard flex">
      <Avatar />
      <div className="info flex">
        <h4>Jaydip Mokariya</h4>
        <h5>@confused_manas</h5>
      </div>
    </div>
  )
}

export default ProfileCard