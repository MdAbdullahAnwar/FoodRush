# 🍔 FoodRush - Food Ordering Platform

FoodRush is a full-stack food ordering application built with **React**, **Firebase**, and **Clerk Authentication**. It features a modern **Admin Dashboard** for restaurant owners and a rich **Frontend User Interface** for customers to browse, order and manage food delivery.

---

## 🛠 Tech Stack

| Role     | Technology                                                                 |
|----------|----------------------------------------------------------------------------|
| Frontend | React.js, CSS, React Toastify, Lucide React Icons                          |
| Backend  | Firebase (Authentication, Firestore DB), Razorpay (Payment)                |
| Auth     | Clerk (Admin Panel), Firebase (Users)                                      |

---

## 🔐 Admin Features

> The admin panel is in a **separate repo**. It’s built for simple management of all store data and user orders.

### 👤 Admin Authentication
- Login/Signup via [Clerk.dev](https://clerk.dev)
- Secure route access

### 🧾 Product Management
- **Add New Product**: Upload name, price, category, image
- **Edit Product**: Modify existing product details
- **Delete Product**: Remove a product from store

### 🗂 Category Management
- Create new product categories
- Edit or delete existing categories

### 📦 Order Management
- View all placed orders by users
- Update order statuses (e.g. Pending → Delivered)

---

## 👥 User Features

> The frontend is in a **separate repo**. It’s built for users to order.

### 🔐 User Authentication
- **Sign Up / Login / Logout**
- Account security via Firebase Auth

### 🛍️ Product Browsing
- View all products from Firestore
- Filter by category
- Search using keywords

### 🛒 Shopping Cart
- Add products to cart
- Modify quantity or remove items
- Apply promo codes:
  - `FLAT10` (Min $100)
  - `FLAT25` (Min $200)
  - `FLAT50` (Min $300)

### 📦 Orders
- Place new orders with RazorPay checkout
- Track order status
- View order history

### 👤 User Profile
- Update name, email, phone
- Save multiple delivery addresses

---

## 💳 Payment Integration

- **RazorPay** is used for secure payment handling.
- You can integrate sandbox/test keys for development purposes.

---

## 🗂 Folder Structure

```
FoodRush/
├── admin/ # Admin Panel
│ ├── src/
│ │ ├── assets/
│ │ ├── components/ # Sidebar, Navbar, Upload UI
│ │ ├── pages/
│ │ │ ├── Add/ # Add product
│ │ │ ├── List/ # Product list and edit modal
│ │ │ ├── Orders/ # Order management
│ │ │ └── Login/Signup
│ │ ├── firebase.js # Firebase config
│ │ └── main.jsx
│ └── package.json

├── frontend/ # User Interface
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Header, Footer, Menu, Cart, etc.
│ │ ├── context/ # (StoreContext for now)
│ │ ├── pages/ # Cart, Home, Payment, Orders
│ │ ├── firebase.js # Firebase config
│ │ └── main.jsx
│ └── package.json
```

## 🤝 Contributions
Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

---

## 📄 License
This project is licensed under the MIT License.
