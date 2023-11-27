import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Muse.png';
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { RiPlayListFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IconContext } from 'react-icons';

function Sidebar({ accessToken }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    const currentPath = window.location.pathname.split('/')[0];
    const newPath = `${currentPath}/dashboard/${path}`.replace(/\/+/g, '/');
    navigate(newPath, { state: { accessToken } });
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='Sidebar'>
      <div className='dashboard-logo'>
        <img src={logo} alt='logo' /><br />
        <p className='title'>Vibes Vault</p>
      </div>

      <div className="menu">
        <p className='label'>MENU</p>
        <div className='menu-item flex' onClick={() => handleNavigate('/')}>
          <IconContext.Provider value={{size: "23px", className: "sidebar-icon"}}>
            <FaHome />
            <p>Home</p>
          </IconContext.Provider>
        </div>
        <div className='menu-item flex' onClick={() => handleNavigate('/search')}>
          <IconContext.Provider value={{size: "23px", className: "sidebar-icon"}}>
            <FaSearch />
            <p>Search</p>
          </IconContext.Provider>
        </div>
        <div className='menu-item flex' onClick={() => handleNavigate('library')}>
        <IconContext.Provider value={{size: "23px", className: "sidebar-icon"}}>
          <MdVideoLibrary />
            <p>Library</p>
          </IconContext.Provider>
        </div>
        <div className='menu-item' onClick={() => handleNavigate('/playlists')}>
          <IconContext.Provider value={{size: "23px", className: "sidebar-icon"}}>
            <RiPlayListFill />
              <p>Playlists</p>
            </IconContext.Provider>
        </div>
        <br /><br />
        <p className='label'>GENERAL</p>
        <div className='menu-item' onClick={() => handleNavigate('/profile')}>
          <IconContext.Provider value={{size: "23px", className: "sidebar-icon"}}>
            <FaUser />
            <p>Profile</p>
          </IconContext.Provider>
        </div>
        <div className='menu-item' onClick={() => handleLogout()}>
          <IconContext.Provider value={{size: "23px", className: "sidebar-icon"}}>
            <IoLogOut />
            <p>Logout</p>
          </IconContext.Provider>
        </div>
      </div>

      <p className='copyright'>© 2023</p>
    </div>
  );
}

export default Sidebar;
