import React from 'react';
import "./userHome.css";
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';

const UserHome = () => {
  return (
    <>
      <div className="userHome">
        <Posts/>
        <Sidebar/>
      </div>
    </>
  )
}

export default UserHome
