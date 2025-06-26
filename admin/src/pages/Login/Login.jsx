import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <SignIn 
          path="/login" 
          routing="path" 
          signUpUrl="/signup"
        />
      </div>
    </div>
  );
};

export default Login;
