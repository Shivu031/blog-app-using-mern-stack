import React from 'react';
import "./posts.css";
import Data from '../../Data';
import Post from '../post/Post';

const Posts = () => {
  return (
    <>
      <div className="posts">
        {
            Data.map((val, ind)=>{
                return <Post key={ind} title = {val.title}
                description={val.description}
                  username={val.username}                 
                />
            })
        }
      </div>
    </>
  )
}

export default Posts
