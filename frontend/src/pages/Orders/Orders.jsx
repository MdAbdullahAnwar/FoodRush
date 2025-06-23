import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { auth, db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(StoreContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;
      try {
        const ordersRef = collection(db, 'users', userId, 'orders');
        const snapshot = await getDocs(ordersRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <div className="orders">Loading orders...</div>;

  return (
    <div className="orders">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Address:</strong> {order.deliveryInfo?.street}, {order.deliveryInfo?.city}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {Object.entries(order.items).map(([id, qty]) => (
                  <li key={id}>{id} × {qty}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
