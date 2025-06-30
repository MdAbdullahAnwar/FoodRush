# 👨‍💻 FoodRush Admin

**FoodRush Admin** is the backend management panel for the FoodRush food ordering platform. Built using **React.js**, **Clerk Authentication**, **Tawk.To - Live Chatting** and **Firebase Firestore**, this interface empowers administrators to manage the food items, categories, orders efficiently also solving queries from Customer with Live Chat feature.

---

## 🚀 Features

### ✅ Admin Capabilities
- **Authentication via Clerk** (Signup & Login)
- **Add Products**: Upload new food items with image, price, category, and description.
- **Edit Products**: Update name, price, image, and category.
- **Delete Products**: Remove items from the menu.
- **Manage Categories**: Add or remove food categories.
- **Order Management**: 
  - View all user orders.
  - Update order statuses (e.g., Processing, Out for delivery, Delivered, Cancelled).
- **Customer Support using Tawk.To**

---

## 🛠️ Tech Stack

| Frontend           | Backend            |
|--------------------|--------------------|
| React.js           | Firebase Firestore |
| Clerk (Auth)       |                    |
| React Toastify     |                    |
| Lucide React Icons |                    |

---

## 📁 Folder Structure
```
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
```

## 📬 Feedback & Contributions
Feel free to contribute or suggest improvements by opening issues or pull requests.

---

## 📄 License
This project is licensed under the MIT License.
