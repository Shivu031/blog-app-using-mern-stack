import React from 'react';

const UserNav = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">BLOG APP</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
                </li> */}
                <li className="nav-item">
                <a className="nav-link" href="#">Write</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">
                    <img src="" alt="" className='userProfile'/>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">LogOut</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default UserNav
