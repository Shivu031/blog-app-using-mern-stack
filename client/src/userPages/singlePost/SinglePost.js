import React, { useEffect, useState } from 'react';
import './singlePost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const SinglePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);
  const { user, users} = useAuth();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const token = localStorage.getItem("token");
  console.log(useAuth().user)

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/posts/${postId}`);
        setPost(res.data);
        setTitle(res.data.title || '');
        setDescription(res.data.description || []);
        setIsLiked(res.data.likes.includes(user.userId));
        setLikesCount(res.data.likes.length);
        setComments(res.data.comments || []);
      } catch (err) {
        console.log(err.message);
      }
    };

    getPost();
  }, [postId, user.userId]);


  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/posts/${postId}`, {
        title,
        description,
      });
      setPost(res.data);
      console.log(res.data)
      setUpdatePost(false);
    } catch (err) {
      console.log('Updating error', err);
    }
  };

  const handleDelete = async (e) => {
    const res = window.confirm("Are you sure you want to delete this post?");
    if(res){
      try {
        await axios.delete(`http://127.0.0.1:5000/api/posts/${postId}`);
        navigate('/user');
      } catch (err) {
        console.log('Deleting error', err);
      }
    }else{
      e.preventDefault();
    }
    
  };


  const handleLike = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLiked(true);
      setLikesCount(likesCount + 1);
    } catch (err) {
      console.log('Like error', err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/api/posts/${postId}/unlike`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLiked(false);
      setLikesCount(likesCount - 1);
    } catch (err) {
      console.log('Unlike error', err);
    }
  };

  const handleTextChange = (index, newText) => {
    const updatedDescription = description.map((desc, i) => {
      if (i === index) {
        return { ...desc, data: newText };
      }
      return desc;
    });
    setDescription(updatedDescription);
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://127.0.0.1:5000/api/upload', formData);
      const newImageUrl = res.data.url;
      const updatedDescription = description.map((desc, i) => {
        if (i === index) {
          return { ...desc, data: newImageUrl };
        }
        return desc;
      });
      setDescription(updatedDescription);
    } catch (err) {
      console.log('Image upload error', err);
    }
  };
  
  const renderText = (desc, index) => {
    let classNames = '';
    if (desc.attributes) {
      if (desc.attributes.bold) classNames += ' bold';
      if (desc.attributes.italic) classNames += ' italic';
      if (desc.attributes.underline) classNames += ' underline';
      if (desc.attributes.font) classNames += ` font-${desc.attributes.font}`;
    }

    return (
      <div
        key={index}
        className={classNames}
      >
        {desc.data}
      </div>
    );
  };

  const handleToggleComments = () => {
    setShowComments(prevState => !prevState);
  };

  const handleAddComment = async () => {
    try {
      if (!user || !user.userId) {
        console.error('User information not available.');
        return;
      }
  
      const commentData = { 
        text: newComment, 
        author: user.userId 
      };
      const res = await axios.post(`http://127.0.0.1:5000/api/posts/${postId}/comments`,
        commentData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("AA")
      setComments(res.data.comments);
      setNewComment('');
    } catch (err) {
      console.error("Error adding comment:", err.response ? err.response.data : err.message);
    }
  };
  
  const handleUserPostClick = ()=>{
    navigate(`/user/${authorDetails._id}/posts`);
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // Find the author Details from the users list
  const authorDetails = users.find((u) => u._id === post.author);
  
  return (
    <div className="singlePost">
      {updatePost ? (
        <>
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="singleDesc">
            {
              description.map((desc,index)=>{
                if(desc.type === 'image'){
                  return (
                    <div key={index}>
                      <label htmlFor='fileInput'><img src={desc.data} alt="" className="singleImage" /></label>
                      <input
                        type="file"
                        id='fileInput'
                        accept="image/*"
                        style={{display:'none'}}
                        onChange={(e) => handleImageChange(e, index)}
                      />
                    </div>
                  );
                }if (desc.type === 'text' || desc.type === 'font') {
                  return (
                    <textarea
                    key={index}
                    className="singlePostTextarea"
                    value={desc.data}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                  />
                  );
                }
                return null;
              })
            }
          </div>
          <button
            type="submit"
            className="uDBtn btn btn-outline-success"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            type="submit"
            className="uDBtn btn btn-outline-secondary"
            onClick={() => setUpdatePost(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2>{title}</h2>
          <div className="singleProfileCon">
            <span onClick={handleUserPostClick}>
            <img src={authorDetails.userProfile ? "http://127.0.0.1:5000/images/" + authorDetails.userProfile : ''} alt="" className="singleProfilePic" />
            <span className="singleUsername">{authorDetails.username}</span>
            </span>
            <span className="singleDate">
              ~ {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          <hr />
          <div className="singleLikeCon">
          <span onClick={isLiked ? handleUnlike : handleLike}>
              <i className={`fa-regular fa-thumbs-up fa-xl ${isLiked ? 'liked' : ''}`}></i> {likesCount}
            </span>
            <span onClick={handleToggleComments}>
              <i className="fa-regular fa-comment fa-xl"></i> {comments.length}
            </span>
          </div>
          {showComments && (
            <div className="commentsSection">
              <h3>Comments</h3>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <img src={user.userProfile ? "http://127.0.0.1:5000/images/"+user.userProfile : ''} alt="" />
                    <strong>{user.username}:</strong> {comment.text}{' '}
                    <em>{new Date(comment.createdAt).toLocaleString()}</em>
                  </li>
                ))}
              </ul>
              <div className="addComment">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                ></textarea>
                <button onClick={handleAddComment}>Post Comment</button>
              </div>
            </div>
          )}
          <hr />
          {post.author === user.userId ? (
            <div className="singleIconCon">
              <i
                className="singleIcon fa-regular fa-pen-to-square fa-xl"
                onClick={() => setUpdatePost(true)}
              ></i>
              <i
                className="singleIcon fa-solid fa-trash-can fa-xl"
                onClick={handleDelete}
              ></i>
            </div>
          ) : null}
          <div className="singleDesc">
            {description.map((desc, index) => {
              if (desc.type === 'image') {
                return (
                  <img key={index} src={desc.data} alt="" className="singleImage" />
                );
              }
              if (desc.type === 'text' || desc.type === 'font') {
                return (
                  <span key={index} className="singlePara">
                    {renderText(desc, index)}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
