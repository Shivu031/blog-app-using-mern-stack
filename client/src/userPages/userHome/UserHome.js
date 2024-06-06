import React, { useEffect, useState } from 'react';
import "./userHome.css";
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';

const UserHome = () => {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axios.get('http://127.0.0.1:5000/api/posts');
      setPosts(res.data);
    }
    getPosts();
  },[]);
  return (
    <>
      <div className="userHome">
        <Posts posts={posts}/>
        <Sidebar/>
      </div>
    </>
  )
}

export default UserHome
