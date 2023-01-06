import { UilChat, UilSearch } from '@iconscout/react-unicons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/AuthAction';

import './SearchBar.css';

const SearchBar = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut())
  }
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

      <div className='profile-div'>
        {/* <Link to={`/profile/${user._id}`} > */}
          <img className='profile-picture' alt=""
            src={serverPublic + user.profilePicture}
            onClick={handleLogOut}
          />
        {/* </Link> */}
      </div>


      {/* For smaller screens */}
      <div className='chat-icon'>
        <UilChat />
      </div>

    </div>
  )
}

export default SearchBar