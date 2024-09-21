import React from 'react';
import "./about.css";

const About = () => {
    const instaUrl = "https://www.instagram.com/";
    const fbUrl = "https://www.facebook.com/";
    const linkUrl = "https://www.linkedin.com/in/shivanee-patel-307672253/";
    const gitUrl = "https://github.com/Shivu031";
  return (
    <>
      <div className="about">
        <h2>About Us!</h2>
        <div className="aboutCon">
            <div className='aboutPara'>Hii Guys, <br/>&emsp; Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus asperiores blanditiis et neque ipsum fugit ad, placeat quidem tempora perspiciatis! Enim, quae. Dignissimos, ab illum. Eius eum recusandae laudantium ullam.
            <br/><br/>
            &emsp; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, libero illum ex distinctio, optio itaque quisquam unde rem corrupti illo mollitia reprehenderit nemo fuga reiciendis laboriosam? Odit illum animi pariatur.
            <br/><br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, ipsam.
            <br/><br/>
            <hr />
            <h4><u>EDUCATION</u></h4>
            <br/>
            <li>10th - UP Board - 89%</li><br/>
            <li>12th - CBSE Board - 84.4%</li><br/>
            <li>B.Sc - CSJMU - 75%</li><br/>
            <li>currently doing MCA from LPU</li><br/>
            </div>
            <img src="/images/about.png" alt="" className="aboutImg" width="400" height="500"/>
        </div>
        <hr />
        <div>
            <h3><u>FOLLOW US</u></h3>
            <div className="aboutIcon">
                <a href={`${instaUrl}`} target='_blank'>Instagram</a>
                <a href={`${fbUrl}`} target='_blank'>Facebook</a>
                <a href={`${linkUrl}`} target='_blank'>LinkedIn</a>
                <a href={`${gitUrl}`} target='_blank'>GitHub</a>
            </div>
        </div>
      </div>
    </>
  )
}

export default About
