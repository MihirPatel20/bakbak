import React from 'react';
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import './Post.css';


const Post = ({ data }) => {
  return (
    <div className="Post card">

      {/* user details */}
      <div className="ProfileCard flex">
        <img className='profile-picture' src={data.image} alt="" />
        <div className="info flex">
          <h4>{data.name}</h4>
          <h5>{data.time}</h5>
        </div>
      </div>

      <img className='post-image' src={data.postImage} alt="" />



      {/* Your reactions */}
      <div className="response">
        <div className="reactions">
          <FiHeart />
          <FiMessageCircle />
          <FiSend />

        </div>
        <div className="caption">
          <p>{data.likes} likes</p>
          <span><b>{data.username}</b></span>
          <span> {data.desc}</span>
        </div>
      </div>

    </div>
  )
}

export default Post