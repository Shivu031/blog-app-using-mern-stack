import React, { useState } from 'react';
import "./setting.css";

const Setting = () => {
    
  return (
    <>
      <div className="setting">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingForm">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Profile Picture: <br/>
              <img src="" alt="" className='settingImg'/>
              <i className="settingIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file" style={{display:'none'}} className="form-control" id="exampleFormControlInput1" name='profilePic'/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username:</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="username" name='username'/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name='email'/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Phone:</label>
            <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="phone number" name='phone' />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="password" name='password'/>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-secondary" type="submit">UPDATE</button>
          </div>
        </form>  
      </div>
    </>
  )
}

export default Setting
