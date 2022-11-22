import { UilSearch } from '@iconscout/react-unicons'
import React from 'react'
// import img1 from "../../images/profile-photos/toy-1.jpg"

import { Friends } from '../../Data/FriendsData'
import './ChatColumn.css'

const ChatColumn = () => {
  return (
    <div className="ChatColumn">

      <div className="chat-card card">

          <div className="recent-chats-title flex">
            <div>Recent Chats</div>
            <div className="search-icon">
              <UilSearch />
            </div>
          </div>

          {Friends.map((friend, id) => {
            return (
              <div className="ProfileCard flex">
                <img className='profile-picture' src={friend.image} alt="" />
                <div className="info flex">
                  <h4>{friend.name}</h4>
                  <h5 className='username'>@{friend.username}</h5>
                </div>
              </div>
            )
          })}

      </div>
      
    </div>
  )
}

export default ChatColumn