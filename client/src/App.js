import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Discover from './components/Discover/Discover';
import Friends from './components/Friends/Friends';
import NewPostColumn from './components/newPostColumn/NewPostColumn';
import Posts from './components/posts/Posts';
import ProfileColumn from './components/profileColumn/ProfileColumn';
import Auth from './pages/Auth/Auth';
import Home from './pages/home/Home';

function App() {
  const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={
          user
            ? <Navigate to="home" />
            : <Navigate to="auth" />
        } />
        <Route path='/auth' element={user ? <Navigate to="../home" /> : <Auth />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to="../auth" />} >
          <Route path='' element={user ? <Posts /> : <Navigate to="../auth"/>} />
          <Route path='newpost' element={user ? <NewPostColumn /> : <Navigate to="../auth" />} />
          <Route path='profile/:id' element={user ? <ProfileColumn /> : <Navigate to="../auth" />} />
          <Route path='discover' element={user ? <Discover /> : <Navigate to="../auth" />} />
          <Route path='friends' element={user ? <Friends /> : <Navigate to="../auth" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
