import React, { useState } from 'react';
import "./setting.css";
import { useAuth } from '../../store/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Setting = () => {
  const [file,setFile] = useState(null);
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  
  const {user,LogoutUser, storeTokenInLS} = useAuth();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  
  // console.log(useAuth());
  console.log(useAuth().user);
  console.log(token);

  const handleUpdateSubmit = async(e) =>{
    e.preventDefault();
    const updatedUser = {
      userId: user.userId,
      username: username || user.username,
      email: email || user.email,
    };
    if(file){
      const data = new FormData();
      console.log(data)
      data.append("name",file.name);
      data.append("file",file);
      updatedUser.userProfile = file.name;
      try{
        await axios.post("http://127.0.0.1:5000/api/upload",data, {
          headers: {
            Authorization: `Bearer ${token}`}
          });
      }catch(err){
        console.log(err);
      }
    }
    try{
      const res = await axios.put(`http://127.0.0.1:5000/api/users/${user.userId}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      storeTokenInLS(token, res.data);
      if(res){
        toast.success("updted successfully", {
          autoClose: 1000,
        });
      }
    }catch(err){
        console.log("error",err);
        toast.error("Error...", {
          autoClose: 1000,
        });
    }
  }

  const handleDeleteAccount = async (e) => {
    const res = window.confirm("Are you sure you want to delete your account?");
    if(res){
      try {
        const res = await axios.delete(`http://127.0.0.1:5000/api/users/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        LogoutUser();
        navigate("/register");
      } catch (err) {
        console.log(err);
      }
    }else{
      e.preventDefault();
    }
  }
    
  return (
    <>
      <div className="setting">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle" onClick={handleDeleteAccount}>Delete Account</span>
        </div>
        <form className="settingForm" onSubmit={handleUpdateSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Profile Picture: <br/>
              <img src={file ? URL.createObjectURL(file) : "http://127.0.0.1:5000/images/" + user.userProfile} alt="" className='settingImg'/>
              <i className="settingIcon fa-regular fa-circle-user"></i>
            </label>
            <input type="file" style={{display:'none'}} className="form-control" id="exampleFormControlInput1" onChange={(e)=>setFile(e.target.files[0])}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username:</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address:</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-secondary" type="submit">UPDATE</button>
          </div>
        </form>  
        <ToastContainer />
      </div>
    </>
  )
}

export default Setting
