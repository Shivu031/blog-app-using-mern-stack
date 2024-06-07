import React, { useEffect, useState } from 'react';
import "./singlePost.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const SinglePost = () => {
  
  const {postId} = useParams();
  const [post, setPost] = useState(null);
  // console.log(useParams())
  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/api/posts/${postId}`);
            setPost(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    getPost();
  }, [postId]);

  if (!post) {
      return <div>Loading...</div>;
  }

  const handleUpdate = async()=>{
    try{
      // const res = await axios.put(`http://127.0.0.1:5000/api/posts/${postId}`,{
        
      // })
    }catch(err){
      console.log("updating error",err);
    }
  }

  const handleDelete =async()=>{
    try{
      await axios.delete(`http://127.0.0.1:5000/api/posts/${postId}`);
      alert("post deleted successfully");
      navigate("/user");
    }catch(err){
      console.log("deleting error",err);
    }
  }

  return (
    <>
      <div className="singlePost">
        <h2>{post.title}</h2>
        <div className="singleProfileCon">
           <img src="" alt="" className='singleProfilePic'/> 
           <span className='singleUsername'>{post.username}</span>
           <span className='singleDate'>~ {new Date(post.createdAt).toDateString()}</span>
        </div>
        <hr />
        <div className="singleLikeCon">
            <span>
            <i className="fa-regular fa-thumbs-up fa-xl"></i> 2
            </span>
            <span>
            <i className="fa-regular fa-comment fa-xl"></i> 4
            </span>
            
        </div>
        <hr />
        {
          post.author === user.userId ? (
            <div className="singleIconCon">
            <i className="singleIcon fa-regular fa-pen-to-square fa-xl" onClick={handleUpdate}></i>
            <i className="singleIcon fa-solid fa-trash-can fa-xl" onClick={handleDelete}></i>
            </div>
          ) : null
        }
        
        <div className="singleDesc">
          {post.description.map((desc, index) => {
              if (desc.type === 'image') {
                  return <img key={index} src={desc.data} alt="" className="singleImage" />;
              }
              if (desc.type === 'text') {
                  return <p key={index} className='singlePara'>{desc.data}</p>;
              }
              return null;
          })}
        </div>
      </div>
    </>
  )
}

export default SinglePost
