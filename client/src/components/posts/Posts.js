import React from 'react';
import "./posts.css";
import Post from '../post/Post';
import { useAuth } from '../../store/auth';

const Posts = ({posts}) => {
  const {users} = useAuth();
  // console.log(useAuth().users);
  return (
    <>
      <div className="posts">
        {posts.map((p)=>(
          <Post key={p._id} 
          post={p} 
          authorDetails={users.find((u) => u._id === p.author)}
          />
        ))}
      </div>
    </>
  )
}

export default Posts
