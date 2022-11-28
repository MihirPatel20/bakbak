import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/userAction';
import './User.css';

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const [following, setFollowing] = useState(person.followers.includes(user._id))
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user))

    setFollowing(prev => !prev)
  }

  return (
    <div className="user flex">
      <img className='profile-picture' alt=''
        src={serverPublic + person.profilePicture}
      />

      <div className="info flex">
        <h4>{person.firstname} {person.lastname}</h4>
        <h5>@{person.username}</h5>
      </div>
      <button className={following ? 'button-out follow-btn' :'button follow-btn'} onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  )
}

export default User