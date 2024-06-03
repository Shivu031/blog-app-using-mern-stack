import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/user">BLOG APP</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link" to="/user/write">Write</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/user/setting">
                    <img src="" alt="" className='userProfile'/>
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/user/logout">LogOut</NavLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default UserNav
