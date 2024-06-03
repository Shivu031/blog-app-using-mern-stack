import React from 'react';
import "./sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarCon">
          <span>Writing on blog app</span>
          <button type="button" className="btn btn-secondary btn-sm">Start Writing</button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
