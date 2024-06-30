import React from 'react';
import "./sidebar.css";
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    navigate("/user/write");
  }
  
  const handleTopicClick = (topic) => {
    navigate(`/user/search?q=${topic}`);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebarCon">
          <span>Writing on blog app</span>
          <button type="submit" className="sidebarBtn btn btn-secondary btn-sm" onClick={handleClick}>Start Writing</button>
        </div>
        <div className="recomCon">
          <span>Recommended topics</span>
          <ul className="sideLists">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Node js', 'Web Development'].map((topic) => (
              <li
                key={topic}
                className="sidebarListItem"
                onClick={() => handleTopicClick(topic)}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Sidebar
