import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';
import Post from '../post/Post';
import './Posts.css';

const Posts = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts, loading } = useSelector((state) => state.postReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts"
        : posts.map((post, id) => {
          return <Post data={post} />
        })}
    </div>
  )
}

export default Posts