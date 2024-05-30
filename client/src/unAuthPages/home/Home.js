import React from 'react';
import "./home.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/register");
  }
  return (
    <>
      <div className="home">
        <div className="homeHeader">
          <h2>Welcome to my blog app</h2>
          <button type="button" className="btn btn-secondary" onClick={handleClick}>Get Started</button>
        </div>
        <img className='image' src="/images/home.png" alt="" width="400" height="500"/>
      </div>
    </>
  )
}

export default Home
