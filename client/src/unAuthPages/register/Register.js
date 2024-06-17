import React, { useState } from 'react';
import "./register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
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
      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", userData);
      // console.log(res);
      console.log(res.data);
      if (res) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } else {
        toast.error("Something went wrong...");
      }
    }catch(err){
      toast.error("Something went wrong...");
    }
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
                <label htmlFor="exampleFormControlInput1" className="form-label">Password:</label>
                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="password" name='password' value={userData.password} onChange={handleInput} required/>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-secondary" type="submit">Register Now!</button>
            </div>
        </form>
        <ToastContainer/>
        <a href="/login">Already have an account</a><br/>
      </div>
    </>
  )
}

export default Register
