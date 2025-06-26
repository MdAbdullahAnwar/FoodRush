import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import UploadFoods from './components/Admin/UploadFoods';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const App = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider 
      publishableKey={clerkKey}
      navigate={(to) => navigate(to)}
    >
      <div className="app-container">
        <ToastContainer/>
        <Navbar/>
        <div className="app-content">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route
              path="/add"
              element={
                <>
                  <SignedIn>
                    <Add />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/list"
              element={
                <>
                  <SignedIn>
                    <List />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/orders"
              element={
                <>
                  <SignedIn>
                    <Orders />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/upload-foods"
              element={
                <>
                  <SignedIn>
                    <UploadFoods />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </ClerkProvider>
  )
}

export default App;
