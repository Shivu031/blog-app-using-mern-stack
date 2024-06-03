import React from 'react';
import Nav from '../components/navbar/Nav';
import Home from '../unAuthPages/home/Home';
import Footer from '../components/footer/Footer';
import About from '../unAuthPages/about/About';
import Login from '../unAuthPages/login/Login';
import Register from '../unAuthPages/register/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from './User';

const UnAuth = () => {
  return (
    <>
    {/* <Router> */}
      <Nav/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
    {/* </Router> */}
    </>
  )
}

export default UnAuth
