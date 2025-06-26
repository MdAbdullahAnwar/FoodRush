import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './SignUp.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <SignUp 
          path="/signup" 
          routing="path" 
          signInUrl="/login"
        />
      </div>
    </div>
  );
};

export default Signup;
