# 🍔 FoodRush - Food Ordering Platform

FoodRush is a full-stack food ordering application built with **React**, **Firebase**, and **Clerk Authentication**. It features a modern **Admin Dashboard** for restaurant owners and a rich **Frontend User Interface** for customers to browse, order and manage food delivery. Also **Customer** can communicate to **Admin** by using **Tawk.To** Chat Widget.

---

## 🛠 Tech Stack

| Role     | Technology                                                                 |
|----------|----------------------------------------------------------------------------|
| Frontend | React.js, CSS, React Toastify, Lucide React Icons, Tawk.To                 |
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

### 💬 Tawk.to 
  - **Chat Dashboard** that redirects to Tawk.To for Customer Suppport

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

### 💬 Tawk.to Integration
- **Chat Widget** For Customers to ask queries from Admin

### 💳 Payment Integration

- **RazorPay** is used for secure payment handling.

---

## 🗂 Folder Structure

```
FoodRush/
admin/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── Admin/
│ │ │ └── UploadFoods.jsx
│ │ ├── Navbar/
│ │ │ ├── Navbar.css
│ │ │ └── Navbar.jsx
│ │ └── Sidebar/
│ │ ├── Sidebar.css
│ │ └── Sidebar.jsx
│ ├── pages/
│ │ ├── Add/
│ │ │ ├── Add.css
│ │ │ └── Add.jsx
│ │ ├── Home/
│ │ │ ├── Home.css
│ │ │ └── Home.jsx
│ │ ├── List/
│ │ │ ├── EditModal.css
│ │ │ ├── EditModal.jsx
│ │ │ ├── List.css
│ │ │ └── List.jsx
│ │ ├── Login/
│ │ │ ├── Login.css
│ │ │ └── Login.jsx
│ │ ├── Orders/
│ │ │ ├── Orders.css
│ │ │ └── Orders.jsx
│ │ └── SignUp/
│ │ ├── SignUp.css
│ │ └── SignUp.jsx
│ ├── App.jsx
│ ├── firebase.js
│ ├── index.css
│ └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js

frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # Images, logos, etc.
│ ├── components/
│ │ ├── AppDownload/ # App banner section
│ │ ├── ExploreMenu/ # Category filtering UI
│ │ ├── FoodDisplay/ # List foods by category
│ │ ├── FoodItem/ # Individual food card
│ │ ├── Footer/ # Footer
│ │ ├── Header/ # Top header with banner
│ │ ├── LoginPopup/ # Login modal
│ │ ├── Navbar/ # Site-wide navigation bar
│ │ ├── ProtectedRoute/ # Route guard logic
│ │ └── TawkToWidget/ # Chat Widget
│ ├── context/
│ │ └── StoreContext.jsx # Context API store (legacy)
│ ├── features/ # Redux Toolkit slices
│ │ ├── auth/ # Firebase auth slice
│ │ ├── cart/ # Cart slice + helpers
│ │ └── food/ # Food fetch slice
│ ├── pages/
│ │ ├── Cart/ # Cart page
│ │ ├── Home/ # Homepage
│ │ ├── Orders/ # Past order history
│ │ ├── Payment/ # RazorPay integration
│ │ ├── PlaceOrder/ # Address & order confirmation
│ │ └── UserProfile/ # Profile update form
│ ├── firebase.js # Firebase SDK setup
│ ├── App.jsx # Main route file
│ ├── main.jsx # ReactDOM root + Providers
│ └── index.css # Global styles
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contributions
Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

---

## 📄 License
This project is licensed under the MIT License.
