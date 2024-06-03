import React from 'react';
import "./post.css";
import {useNavigate} from 'react-router-dom';


const Post = (props) => {
  const navigate = useNavigate();

  const firstImage = props.description.find(desc => desc.type === 'img');
  const firstDesc = props.description.find(desc=>desc.type==='text');

  const handleClick = ()=>{
    navigate('/user/post/:postId')
  }

  return (
    <>
      <div className="post">
        <div className="postNav">
          <img src="" alt="" className='postNavImg' />
          <span className="postUsername">{props.username}</span>
          <span className='postDate'>10sep, 2024</span>
        </div>
        <div className="postTitle" onClick={handleClick}>
          <h3>{props.title}</h3>
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
