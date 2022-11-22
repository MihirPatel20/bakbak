import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Posts from '../posts/Posts';

import NewPostColumn from '../../components/newPostColumn/NewPostColumn';
import ProfileColumn from '../../components/profileColumn/ProfileColumn';
import './PostColumn.css';

const PostColumn = () => {
  return (
    <div className="PostColumn">
      {/* <SharePost /> */}
      {/* <Posts /> */}


      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/addpost' element={<NewPostColumn />} />
        <Route path='/profile' element={<ProfileColumn />} />
      </Routes>
    </div>
  )
}

export default PostColumn