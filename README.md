# Sweet Shop Management System

A full-stack Sweet Shop Management System built with Node.js, Express, MongoDB, and React. This application allows users to register, log in, view sweets, search/filter sweets, and purchase sweets. Admins can add, update, and delete sweets and manage inventory.

---

## 🎯 Objective

To design, build, and test a robust full-stack Sweet Shop Management System that demonstrates:

- RESTful API development with Express  
- JWT-based authentication and authorization  
- CRUD operations for sweets  
- Inventory management (purchase, restock)  
- Search and filter functionality  
- A responsive and attractive React frontend  

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Node.js with Express  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  
- **API Testing**: Thunder Client (VS Code)  

### Frontend
- **Framework**: React (Vite)  
- **Styling**: Inline CSS (no external CSS framework)  
- **State Management**: React hooks (`useState`, `useEffect`)  

---

## 📦 Features

### User Authentication
- User registration and login  
- JWT token-based authentication  
- Protected routes for admin actions  

### Sweets Management
- View all available sweets  
- Search sweets by name  
- Purchase sweets (decreases quantity)  
- Admin-only:
  - Add new sweets  
  - Delete sweets  

### Inventory Management
- Purchase endpoint: decreases quantity of a sweet  
- (Optional) Restock endpoint: increases quantity (admin only)  

### Frontend
- Login and registration forms  
- Dashboard to view sweets  
- Search and filter sweets  
- Purchase button (disabled when out of stock)  
- Admin form to add sweets  

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)  
- MongoDB (local or Atlas)  
- npm  

### 1. Clone the Repository
