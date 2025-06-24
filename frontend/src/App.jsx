import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Orders from "./pages/Orders/Orders";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { StoreContext } from "./context/StoreContext";
import Payment from "./pages/Payment/Payment";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { loading } = useContext(StoreContext);

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <>
      {!loading && showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute setShowLogin={setShowLogin}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute setShowLogin={setShowLogin}>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute setShowLogin={setShowLogin}>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute setShowLogin={setShowLogin}>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
