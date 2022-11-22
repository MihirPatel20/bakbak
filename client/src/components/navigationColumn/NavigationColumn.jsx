import React from 'react';
import { FiFileMinus, FiGrid, FiImage, FiPlusSquare, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import avatarImage from '../../images/profile-photos/toy-6.jpg';

import ProfileCard from '../profileCard/ProfileCard';
import './NavigationColumn.css';

const NavigationColumn = () => {
  return (
    <div className="NavigationColumn">
      <div className="sticky-area">

        <div className="my-profile card">
          <ProfileCard />
        </div>


        {/* Page Navigation icons and action names */}
        <div className="nav-items card">

          <div className='feed active'>
            <FiGrid />
            <div>
              <Link to="/home">Feed</Link>
            </div>
          </div>

          <div className='friends'>
            <FiUsers />
            <div>Friends</div>
          </div>

          <div className='events'>
            <FiPlusSquare />
            

            <div><Link to="/home/newpost">New Post</Link></div>
          </div>

          <div className='photos'>
            <FiImage />
            <div>Photos</div>
          </div>

          <div className='files'>
            <FiFileMinus />
            <div>Files</div>
          </div>

          <div className='profile'>
            <img className='profile-picture' src={avatarImage} alt="" />
          </div>

        </div>

      </div>
    </div>
  )
}

export default NavigationColumn