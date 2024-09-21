import React from 'react';
import "./footer.css";

const Footer = () => {
  const linkUrl = "https://www.linkedin.com/in/shivanee-patel-307672253/";
  const gitUrl = "https://github.com/Shivu031";
  return (
    <>
    <div className="footCon bg-secondary">
      <ul className="footLi">
        <li className="footLiItem">About</li>
        <li className="footLiItem">Terms</li>
        <div className="footSocial">
          <a href={`${linkUrl}`} target='_blank'><i class="fa-brands fa-linkedin fa-lg"></i></a>
          <a href={`${gitUrl}`} target='_blank'><i class="fa-brands fa-github fa-lg"></i></a>
        </div>
      </ul>
      <p>copyright &copy; 2024</p>
    </div> 
    </>
  )
}

export default Footer
