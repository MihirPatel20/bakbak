import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatColumn from '../../components/chatColumn/ChatColumn';
import NavigationColumn from '../../components/navigationColumn/NavigationColumn';

import SearchBar from '../../components/searchBar/SearchBar';
import './Home.css';

const Home = () => {
  return (
    <>
      <SearchBar />
      <div className="Home">
        <NavigationColumn />
        <Outlet />
        <ChatColumn />
      </div>
    </>

  )
}

export default Home