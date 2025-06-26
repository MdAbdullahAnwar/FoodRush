import React from 'react';
import { SignedIn } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <SignedIn>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to='/add' className="sidebar-option">
              <img src={assets.add_icon} alt="Add"/>
              <p>Add Items</p>
          </NavLink>
          <NavLink to='/list' className="sidebar-option">
              <img src={assets.order_icon} alt="List"/>
              <p>List Items</p>
          </NavLink>
          <NavLink to='/orders' className="sidebar-option">
              <img src={assets.order_icon} alt="Orders"/>
              <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </SignedIn>
  );
};

export default Sidebar;
