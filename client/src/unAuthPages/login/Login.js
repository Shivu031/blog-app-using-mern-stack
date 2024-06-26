import React, { useState } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../store/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  
  const {storeTokenInLS} = useAuth();
  const navigate = useNavigate();

  const handleInput = (e)=>{
    const {name, value} = e.target;

    setUserData({
        ...userData,
        [name] : value,
    })
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(userData);
    try{
      const res = await axios.post("http://127.0.0.1:5000/api/auth/login", userData);
      // console.log(res);
      console.log(res.data);
      storeTokenInLS(res.data.token, res.data.user);
      if (res) {
        toast.success("Login successful");
        setTimeout(() => {
          navigate('/user');
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error('Invalid Credentials');
      }
    }catch(err){
      toast.error('Invalid Credentials');
    }
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
        <ToastContainer />
      </div>
    </>
  )
}

export default Login
