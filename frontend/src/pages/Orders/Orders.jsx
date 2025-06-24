import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useLocation } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, refreshCart, food_list } = useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    // Handle success state from payment
    if (location.state?.success) {
      toast.success(`Payment completed successfully! Order ID: ${location.state.orderId}`);
      
      // Force refresh cart to ensure it's empty
      if (refreshCart) {
        refreshCart();
      }
      
      // Clear the location state to prevent showing the message again
      window.history.replaceState({}, document.title);
    } else if (location.state?.error) {
      toast.error(location.state.message || "There was an error with your order");
      window.history.replaceState({}, document.title);
    }
  }, [location.state, refreshCart]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      
      try {
        const ordersRef = collection(db, 'users', userId, 'orders');
        // Order by date descending to show newest first
        const q = query(ordersRef, orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
        console.log(`Fetched ${data.length} orders for user:`, userId);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const getItemName = (itemId) => {
    const item = food_list.find(food => food._id === itemId);
    return item ? item.name : itemId;
  };

  const getStatusBadge = (order) => {
    const status = order.paymentStatus || order.status || 'pending';
    const statusClass = {
      'completed': 'status-completed',
      'paid': 'status-completed',
      'pending': 'status-pending',
      'failed': 'status-failed',
      'payment_failed': 'status-failed'
    };

    return (
      <span className={`status-badge ${statusClass[status] || 'status-pending'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) return <div className="orders">Loading orders...</div>;

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet.</p>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                </div>
                <div>
                  {getStatusBadge(order)}
                </div>
              </div>
              
              <div className="order-details">
                <p><strong>Delivery Address:</strong></p>
                <p>{order.deliveryInfo?.street}, {order.deliveryInfo?.city}, {order.deliveryInfo?.state} {order.deliveryInfo?.zip}</p>
                
                <div className="order-items">
                  <p><strong>Items:</strong></p>
                  <ul>
                    {Object.entries(order.items || {}).map(([id, qty]) => (
                      <li key={id}>
                        {getItemName(id)} × {qty}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="summary-row discount">
                      <span>Discount:</span>
                      <span>-${order.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>Delivery Fee:</span>
                    <span>${order.deliveryFee?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="summary-row total">
                    <span><strong>Total:</strong></span>
                    <span><strong>${order.total?.toFixed(2) || '0.00'}</strong></span>
                  </div>
                </div>
                
                {order.razorpayPaymentId && (
                  <p className="payment-id">
                    <strong>Payment ID:</strong> {order.razorpayPaymentId}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;