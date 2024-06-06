import React from 'react';
import "./post.css";
import {useNavigate} from 'react-router-dom';


const Post = ({post}) => {
  const navigate = useNavigate();

  const firstImage = post.description.find(desc => desc.type === 'image');
  const firstDesc = post.description.find(desc=>desc.type==='text');

  const handleClick = ()=>{
    navigate(`/user/post/${post._id}`);
  }

  return (
    <>
      <div className="post">
        <div className="postNav">
          <img src="" alt="" className='postNavImg' />
          <span className="postUsername">{post.username}</span>
          <span className='postDate'>~  {new Date(post.createdAt).toDateString()}</span>
        </div>
        <div className="postTitle" onClick={handleClick}>
          <h3>{post.title}</h3>
        </div>
        <div className="postDescription">
          <p className="postDescPara">
            {firstDesc.data}
          </p>
          <img src={firstImage.data} alt="" className="postDescImg" />
        </div>
        <hr />
      </div>
    </>
  )
}

export default Post
