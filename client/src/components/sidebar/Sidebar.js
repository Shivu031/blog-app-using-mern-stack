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
            <li className="sidebarListItem">HTML</li>
            <li className="sidebarListItem">CSS</li>
            <li className="sidebarListItem">JavaScript</li>
            <li className="sidebarListItem">React</li>
            <li className="sidebarListItem">Node js</li>
            <li className="sidebarListItem">Web Development</li>
          </ul>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Sidebar
