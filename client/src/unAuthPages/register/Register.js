import React, { useState } from 'react';
import "./register.css";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
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
      <div className="register">
        <h2>Register Now!</h2>
        <form className='registerForm' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Username:</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="username" name='username' value={userData.username} onChange={handleInput} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name='email' value={userData.email} onChange={handleInput} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number:</label>
                <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="phone number" name='phone' value={userData.phone} onChange={handleInput} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="password" name='password' value={userData.password} onChange={handleInput} required/>
            </div>
            {/* <button type="button" className="btn btn-secondary">Register Now!</button> */}
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-secondary" type="submit">Register Now!</button>
            </div>
        </form>
        <a href="/login">Already have an account</a>
      </div>
    </>
  )
}

export default Register
