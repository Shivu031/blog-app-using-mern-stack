import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import axios from 'axios';
import Post from '../post/Post';

const UserPost = () => {
    const {users} = useAuth();
    const {userId} = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const getUserPosts = async()=>{
          const res = await axios.get(`http://127.0.0.1:5000/api/posts/user/${userId}`);
          setPosts(res.data);
          console.log(res.data)
        }
        getUserPosts();
      },[]);

  return (
    <>
      <div className="posts">
        {posts.map((p) => (
            <Post
            key={p._id}
            post={p}
            authorDetails={users.find((u) => u._id === p.author)}
            />
        ))}
    </div>
    </>
  )
}

export default UserPost
