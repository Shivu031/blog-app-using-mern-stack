import React, { useState } from 'react';
import "./login.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e)=>{
    const {name, value} = e.target;

    setUserData({
        ...userData,
        [name] : value,
    })
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(userData);
  }

  return (
    <>
      <div className="login">
        <h2>Login Now!</h2>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name='email' value={userData.email} onChange={handleInput} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="password" name='password' value={userData.password} onChange={handleInput} required/>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-secondary" type="submit">Login Now!</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login
