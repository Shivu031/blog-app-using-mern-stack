import React from 'react'
import UserNav from '../components/navbar/UserNav'
import Write from '../userPages/wirte/Write'
import Setting from '../userPages/setting/Setting'
import Footer from '../components/footer/Footer'
import UserHome from '../userPages/userHome/UserHome'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SinglePost from '../userPages/singlePost/SinglePost'
import Logout from '../userPages/logout/Logout'
import UserPost from '../components/posts/UserPost'

const User = () => {
  return (
    <>
    {/* <Router> */}
      <UserNav/>
      <Routes>
        <Route exact path='/' element={<UserHome/>}/>
        <Route exact path='/write' element={<Write/>}/>
        <Route exact path='/setting' element={<Setting/>}/>
        <Route exact path='/post/:postId' element={<SinglePost/>}/>
        <Route exact path='/:userId/posts' element={<UserPost/>}/>
        <Route exact path='/logout' element={<Logout/>}/>
      </Routes>
    {/* </Router> */}
    </>
  )
}

export default User
