import React, { useEffect, useRef, useState } from 'react';
import "./nav.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const UserNav = () => {
    const {user} = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
    const navbarRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/user/search?q=${searchQuery}`);
        }
        setSearchQuery('');
        setIsNavbarCollapsed(true);
    };

    const toggleNavbar = () => {
        setIsNavbarCollapsed(!isNavbarCollapsed);
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setIsNavbarCollapsed(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleNavLinkClick = () => {
        setIsNavbarCollapsed(true);
    };


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" ref={navbarRef}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/user" onClick={handleNavLinkClick}>BLOG APP</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavbarCollapsed} aria-label="Toggle navigation" onClick={toggleNavbar}>
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
            <form className="d-flex" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link" to="/user/write" onClick={handleNavLinkClick}>Write</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/user/setting" onClick={handleNavLinkClick}>
                    <img src={user.userProfile ? "http://127.0.0.1:5000/images/"+ user.userProfile : ''} alt="" className='userProfile'/>
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/user/logout" onClick={handleNavLinkClick}>LogOut</NavLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default UserNav
