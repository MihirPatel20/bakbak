import React, { useState } from 'react';
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequests.js';
import './Post.css';


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setlikes] = useState(data.likes.length)

  const handleLike = () => {
    likePost(data._id, user._id)
    setLiked(prev => !prev);
    liked ? setlikes(prev => prev - 1) : setlikes(prev => prev + 1)

    console.log(data);
  }

  return (
    <div className="Post card">

      {/* user details */}
      <div className="ProfileCard flex">
        <img className='profile-picture' src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + `../profile-pic/toy-${12}.jpg`} alt="" />
        <div className="info flex">
          <h4>{data.name}</h4>
          <h5>{data.time}</h5>
        </div>
      </div>

      <img className='post-image' src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />



      {/* Your reactions */}
      <div className="response">
        <div className="reactions">
          <FiHeart style={liked ? { fill: "red", color: "red" } : {}} onClick={handleLike} />
          <FiMessageCircle />
          <FiSend />

        </div>
        <div className="caption">
          <p>{likes} likes</p>
          <span><b>{data.username}</b></span>
          <span> {data.desc}</span>
        </div>
      </div>

    </div>
  )
}

export default Post