import React, { useEffect, useRef, useState } from 'react';
import "./nav.css";
import { NavLink } from 'react-router-dom';

const Nav = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const navbarRef = useRef(null);

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary" ref={navbarRef}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/" onClick={handleNavLinkClick}>BLOG APP</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavbarCollapsed} aria-label="Toggle navigation" onClick={toggleNavbar}>
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/" onClick={handleNavLinkClick}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>About</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register" onClick={handleNavLinkClick}>Write</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={handleNavLinkClick}>Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register" onClick={handleNavLinkClick}>Register</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Nav
