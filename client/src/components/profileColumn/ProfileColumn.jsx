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
  const personId = id;
  const [person, setperson] = useState({})

  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)

  useEffect(() => {
    const fetchperson = async () => {
      if (personId === user._id) {
        setperson(user)
        setFollowers(user.followers.length);
        setFollowing(user.following.length);
      }
      else {
        const { data } = await UserApi.getUser(personId)

        setperson(data)
        setFollowers(data.followers.length);
        setFollowing(data.following.length);
      }
    }
    fetchperson();
  }, [user])

  console.log(followers);

  return (
    <div className="ProfileColumn">
      <div className="profile-section card">

        <div className="profile-images">
          <img src={serverPublic + "post1.jpg"} alt="" />
          <div>
            <img src={serverPublic + person.profilePicture} alt="" />
            {personId === user._id
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
          <h2>{person.firstname} {person.lastname}</h2>
          <h4>@{person.username}</h4>
        </div>

        <div className="follow-status">
          <hr />
          <div>
            <div className="follow">
              <span>{following}</span>
              <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{followers}</span>
              <span>Followers</span>
            </div>

            <div className="vl"></div>
            <div className="follow">
              <span>{posts.filter((post) => post.userId === person._id).length}</span>
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