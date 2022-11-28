import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as UserApi from "../../api/UserRequest.js";
import Posts from '../posts/Posts';
import SharePost from '../sharePost/SharePost';
import './ProfileColumn.css';

const ProfileColumn = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { id } = useParams();
  const profileUserId = id;
  const [profileUser, setProfileUser] = useState({})

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      }
      else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser();
  }, [user])

  return (
    <div className="ProfileColumn">
      <div className="profile-section card">

        <div className="profile-images">
          <img src={serverPublic + "post1.jpg"} alt="" />
          <div>
            <img src={serverPublic + user.profilePicture} alt="" />
            {profileUserId === user._id
              ? (
                <Link to={`/home/profile/${user._id}/edit`}>
                  <button className='button-out edit-btn'>
                    Edit Profile
                  </button>
                </Link>
              )
              : ("")
            }

          </div>
        </div>

        <div className="profile-names">
          <h2>{user.firstname} {user.lastname}</h2>
          <h4>@{user.username}</h4>
        </div>

        <div className="follow-status">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>

            <div className="vl"></div>
            <div className="follow">
              <span>{posts.filter((post) => post.userId === user._id).length}</span>
              <span>Posts</span>
            </div>
          </div>
          <hr />
        </div>


      </div>
      {/* Posts */}
      <SharePost />

      <div className="your-posts card">
        Your Posts
      </div>

      <Posts />
    </div>
  )
}

export default ProfileColumn