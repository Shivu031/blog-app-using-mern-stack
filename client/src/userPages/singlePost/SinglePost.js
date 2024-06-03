import React from 'react';
import "./singlePost.css";

const SinglePost = () => {
  return (
    <>
      <div className="singlePost">
        <h2>Titleeeeeeeeee</h2>
        <div className="singleProfileCon">
           <img src="" alt="" className='singleProfilePic'/> 
           <span className='singleUsername'>Username</span>
           <span className='singleDate'>~  10 sep, 2024</span>
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
        <div className="singleIconCon">
        <i className="singleIcon fa-regular fa-pen-to-square fa-xl"></i>
        <i className="singleIcon fa-solid fa-trash-can fa-xl"></i>
        </div>
        <div className="singleDesc">
            <p className="singlePara">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores officia voluptas harum necessitatibus, quidem pariatur quas reprehenderit aperiam impedit dignissimos provident autem eligendi magnam laborum sequi quis voluptate illo quibusdam.
            </p>
            <img src="" alt="" className="singleImg" />
            <p className="singlePara">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis cumque consequatur illum facilis fuga, fugiat et dolorem tenetur beatae eum. Ipsum, enim omnis! Vero tenetur, quae molestias placeat dolor veritatis?
            </p>
        </div>
      </div>
    </>
  )
}

export default SinglePost
