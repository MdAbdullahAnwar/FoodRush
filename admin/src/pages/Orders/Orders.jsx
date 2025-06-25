import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [foodMap, setFoodMap] = useState({});

  useEffect(() => {
    const fetchFoods = async () => {
      const snap = await getDocs(collection(db, "foods"));
      const map = {};
      snap.forEach((doc) => (map[doc.id] = doc.data().name));
      setFoodMap(map);
    };
    const fetchOrders = async () => {
      try {
        const usersSnap = await getDocs(collection(db, "users"));
        const all = [];
        for (let u of usersSnap.docs) {
          const ordersSnap = await getDocs(
            collection(db, "users", u.id, "orders")
          );
          ordersSnap.forEach((o) => {
            all.push({ id: o.id, userId: u.id, ...o.data() });
          });
        }
        setOrders(all.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (e) {
        toast.error("Error loading orders");
        console.error(e);
      }
    };
    fetchFoods();
    fetchOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Admin Orders</h3>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel" />
            <div>
              <p className="order-item-food">
                {Object.entries(order.items || {}).map(([id, qty], i, arr) => (
                  <span key={id}>
                    {foodMap[id] || id} × {qty}
                    {i < arr.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p>
                {order.deliveryInfo?.firstName} {order.deliveryInfo?.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.deliveryInfo?.street},</p>
                <p>
                  {order.deliveryInfo?.city}, {order.deliveryInfo?.state},{" "}
                  {order.deliveryInfo?.country} - {order.deliveryInfo?.zip}
                </p>
              </div>
              <p className="order-item-phone">{order.deliveryInfo?.phone}</p>
            </div>
            <p>Items: {Object.keys(order.items || {}).length}</p>
            <p>₹{order.total?.toFixed(2)}</p>
            <select
              defaultValue={order.status || "Food Processing"}
              onChange={async (e) => {
                const newStatus = e.target.value;
                try {
                  const orderRef = doc(
                    db,
                    "users",
                    order.userId,
                    "orders",
                    order.id
                  );
                  await updateDoc(orderRef, { status: newStatus });
                  toast.success(`Order status updated to ${newStatus}`);
                  setOrders((prev) =>
                    prev.map((o) =>
                      o.id === order.id ? { ...o, status: newStatus } : o
                    )
                  );
                } catch (err) {
                  console.error("Failed to update order status:", err);
                  toast.error("Failed to update order status.");
                }
              }}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
