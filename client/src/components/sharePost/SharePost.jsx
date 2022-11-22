import { UilImagePlus } from '@iconscout/react-unicons'
import React from 'react'
import avatarImage from '../../images/profile-photos/toy-6.jpg'

import './SharePost.css'

const SharePost = () => {
  return (
    <div className='SharePost card'>

      <p>Post Something</p>
      <hr />
      
      <div className="share-section flex">
        <img className='profile-picture' src={avatarImage} alt="" />
        <input type="text" placeholder="What's on your mind!" name="" id="" />
        <div className="image-logo">
          <UilImagePlus />
        </div>
      </div>
      
    </div>
  )
}

export default SharePost