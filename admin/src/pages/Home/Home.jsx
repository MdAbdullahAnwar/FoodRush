import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="home-container">
      {isSignedIn ? (
        <div className="dashboard-redirect">
          <h2>Welcome back to FoodRush Admin</h2>
          <div className="action-buttons">
            <Link to="/add" className="action-button">
              Add New Items
            </Link>
            <Link to="/list" className="action-button">
              View List Items
            </Link>
            <Link to="/orders" className="action-button">
              View Orders
            </Link>
          </div>
        </div>
      ) : (
        <div className="welcome-screen">
          <h1>FoodRush Admin Portal</h1>
          <p>Sign in to manage your restaurant</p>
          <div className="auth-options">
            <Link to="/login" className="login-btn">
              Sign In
            </Link>
            <Link to="/signup" className="signup-btn">
              Create Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
