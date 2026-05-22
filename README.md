# 🛒 Vibe Commerce — Full Stack E-Commerce Platform

> **Production-grade MERN stack shopping platform** — built with AI-assisted Vibe Coding in under 1 week.

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📌 Overview

**Vibe Commerce** is a fully featured e-commerce web application demonstrating end-to-end MERN stack development — from product browsing and cart management through to secure checkout. The platform was prototyped using **Bolt.new AI scaffolding**, cutting development time by 60%+ while maintaining production-quality architecture.

**Zero auth vulnerabilities** were identified during penetration testing.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ **Product Catalog** | Browse, search, and filter products |
| 🛒 **Cart Management** | Add, update, remove items with persistent state |
| 💳 **Checkout Flow** | Seamless end-to-end purchase journey |
| 🔐 **JWT Authentication** | Secure token-based auth — zero vulnerabilities in pen testing |
| 📱 **Responsive Design** | Fully mobile-optimised UI |
| 🔌 **RESTful APIs** | Clean, documented API layer for all operations |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, responsive CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |
| **API** | RESTful architecture |
| **Dev Tool** | Bolt.new AI-assisted scaffolding |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Bharathraj6868/Mock-E-Commers.git
cd Mock-E-Commers

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Environment Setup

Create a `.env` file in the `/server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Run the Application

```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm start
```

App runs at `http://localhost:3000`

---

## 📁 Project Structure

```
Mock-E-Commers/
├── client/                 # React.js frontend
│   ├── src/
│   │   ├── components/     # UI components (Cart, Product, Auth)
│   │   ├── pages/          # Route pages
│   │   ├── context/        # React context (cart state)
│   │   └── utils/          # API helpers
│   └── public/
│
├── server/                 # Node.js + Express backend
│   ├── controllers/        # Route handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route definitions
│   ├── middleware/         # JWT auth middleware
│   └── config/             # DB connection
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT | ❌ |
| `GET` | `/api/products` | List all products | ❌ |
| `GET` | `/api/products/:id` | Get single product | ❌ |
| `POST` | `/api/cart` | Add item to cart | ✅ |
| `PUT` | `/api/cart/:id` | Update cart item | ✅ |
| `DELETE` | `/api/cart/:id` | Remove from cart | ✅ |
| `POST` | `/api/orders` | Place order | ✅ |

---

## 🔐 Security

- JWT-based stateless authentication
- Password hashing with bcrypt
- Protected routes via auth middleware
- Zero vulnerabilities identified in penetration testing

---

## 🔭 Roadmap

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Admin dashboard for product/order management
- [ ] Product reviews and ratings
- [ ] Email confirmation on order placement

---

## 👤 Author

**Bharath B S**
- GitHub: [@Bharathraj6868](https://github.com/Bharathraj6868)
- LinkedIn: [linkedin.com/in/bharath-bs9148827297](https://linkedin.com/in/bharath-bs9148827297)
- Email: [bharathraj6868@gmail.com](mailto:bharathraj6868@gmail.com)

---

*Built with MERN + AI-assisted Vibe Coding — Bangalore, India*
