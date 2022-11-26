import { UilChat, UilSearch } from '@iconscout/react-unicons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import './SearchBar.css';

const SearchBar = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="SearchBar card">

      <div className="bakbak">
        {/* <div className="logo-icon flexbox">
          <UilComment />
        </div> */}
        <h1>BAKBAK</h1>
      </div>

      <div className="search card">
        <input type="text" placeholder='Search' />
        <div className="search-logo flexbox">
          <UilSearch />
        </div>
      </div>

      <div className='profile-div '>
        <Link to={`/profile/${user._id}`} >
          <img className='profile-picture'
            src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.jpg"}
            alt=""
          />
        </Link>
      </div>

      <div className='chat-icon'>
        <UilChat />
      </div>

    </div>
  )
}

export default SearchBar