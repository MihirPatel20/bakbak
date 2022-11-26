import React from 'react';
import { FiFileMinus, FiGrid, FiImage, FiPlusSquare, FiUsers } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import ProfileCard from '../profileCard/ProfileCard';
import './NavigationColumn.css';

const NavigationColumn = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="NavigationColumn">
      <div className="sticky-area">

        <div className="my-profile card">
          <Link className='link' to={`/home/profile/${user._id}`} >
            <ProfileCard />
          </ Link>
        </div>


        {/* Page Navigation icons and action names */}
        <div className="nav-items card">

          <Link className='link' to="/home">
            <div className='feed active'>
              <FiGrid />
              Feed
            </div>
          </Link>

          <Link className='link' to="/home/friends">
            <div className='friends'>
              <FiUsers />
              Friends
            </div>
          </Link>

          <Link className='link' to="/home/newpost">
            <div className='events'>
              <FiPlusSquare />
              New Post
            </div>
          </Link>

          <Link className='link' to="/home">
            <div className='photos'>
              <FiImage />
              Photos
            </div>
          </Link>

          <Link className='link' to="/home/discover">
            <div className='discover'>
              <FiFileMinus />
              Discover
            </div>
          </Link>

          <div className='profile'>
            <Link to="/home/profile/:id">
              <img
                className='profile-picture'
                src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"}
                alt=""
              />
            </Link>
          </div>

        </div>


        {/* <FollowersCard /> */}

      </div>
    </div>
  )
}

export default NavigationColumn