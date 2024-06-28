import React from 'react';
import "./post.css";
import {useNavigate} from 'react-router-dom';


const Post = ({post, authorDetails}) => {
  const navigate = useNavigate();
  
  const firstImage = post.description.find(desc => desc.type === 'image');
  const firstDesc = post.description.find(desc=>desc.type==='text');

  const handleClick = ()=>{
    navigate(`/user/post/${post._id}`);
  }
  const handleUserPostClick = () =>{
    navigate(`/user/${authorDetails._id}/posts`);
  }

  return (
    <>
      <div className="post">
        <div className="postNav">
          <span onClick={handleUserPostClick}>
            <img src={authorDetails.userProfile ? "http://127.0.0.1:5000/images/"+authorDetails.userProfile : ''} alt="" className='postNavImg' />
            <span className="postUsername">{authorDetails.username}</span>
          </span>
          <span className='postDate'>~  {new Date(post.createdAt).toDateString()}</span>
        </div>
        <div className="postTitle" onClick={handleClick}>
          <h3>{post.title}</h3>
        </div>
        <div className="postDescription">
          {firstDesc && (
            <p className="postDescPara">
              {firstDesc.data}
            </p>
          )}
          {firstImage && (
            <img src={firstImage.data} alt="" className="postDescImg" />
          )}
        </div>
        <hr />
      </div>
    </>
  )
}

export default Post
