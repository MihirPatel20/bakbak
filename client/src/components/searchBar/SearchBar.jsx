import { UilChat, UilSearch } from '@iconscout/react-unicons'
import React from 'react'
import avatarImage from '../../images/profile-photos/toy-6.jpg'

import './SearchBar.css'

const SearchBar = () => {
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
        <img className='profile-picture' src={avatarImage} alt="" />
      </div>

      <div className='chat-icon'>
       <UilChat />
      </div>

    </div>
  )
}

export default SearchBar