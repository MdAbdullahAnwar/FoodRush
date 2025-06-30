import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  const isAdmin = user?.publicMetadata?.role === 'admin';

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt='FoodRush Admin'/>

      <div className="navbar-profile">
        <button className="home-btn" onClick={() => navigate('/')}>Home</button>

        {isSignedIn && (
          <a
            href="https://dashboard.tawk.to/"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-link-btn"
          >
            Chat Dashboard
          </a>
        )}

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <img className='profile' src={assets.profile_image} alt="Profile"/>
        )}
      </div>
    </div>
  );
};

export default Navbar;
