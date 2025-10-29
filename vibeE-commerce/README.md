Vibe Commerce - Full Stack E-Commerce Cart Application

A modern, full-stack e-commerce shopping cart application built with React, Node.js, Express, and MongoDB. Features a complete shopping experience with product browsing, cart management, and mock checkout process.

📋 Table of Contents
1)Features
2)Tech Stack
3)Project Structure
4)Installation
5)Running the Application
6)API Documentation
7)Environment Variables
8)Contributing

--------------------------------------------------------------------------------------------------------------------------------
🎯 Core Features
>>Product Catalog: Browse through 8+ mock products with images, prices, and descriptions

>>Shopping Cart: Add, remove, and update product quantities in real-time

>>Cart Persistence: Session-based cart that persists across browser refreshes

>>Checkout Process: Complete mock checkout with customer information form

>>Order Confirmation: Detailed receipt with order summary and customer details

>>Responsive Design: Mobile-first design that works on all devices
----------------------------------------------------------------
🚀 Advanced Features

>>RESTful API: Clean, well-structured API endpoints
>>Error Handling: Comprehensive error handling on both frontend and backend
>>Loading States: Smooth loading indicators for better UX
>>Form Validation: Client and server-side form validation
>>Modern React Patterns: Context API, custom hooks, and functional components
>>Database Integration: MongoDB with Mongoose ODM
--------------------------------------------------------------------------------------------------------------------------------
🛠 Tech Stack
Frontend
>>React 18 - Modern React with functional components and hooks
>>Context API - State management for cart and application state
>>Axios - HTTP client for API communication
>>CSS3 - Custom responsive styling with Flexbox and Grid
>>Local Storage - Session persistence

Backend
>>Node.js - Runtime environment
>>Express.js - Web framework
>>MongoDB - NoSQL database
>>Mongoose - MongoDB object modeling
>>CORS - Cross-origin resource sharing
>>UUID - Session ID generation

Development Tools
>Nodemon - Auto-restart server during development
>React Scripts - Create React App build tools
--------------------------------------------------------------------------------------------------------------------------------

📁 Project Structure
text
vibe-commerce/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection configuration
│   ├── models/
│   │   ├── Product.js           # Product schema and model
│   │   └── Cart.js              # Cart schema and model
│   ├── routes/
│   │   ├── products.js          # Product-related endpoints
│   │   ├── cart.js              # Cart management endpoints
│   │   └── checkout.js          # Checkout processing endpoint
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling middleware
│   ├── scripts/
│   │   └── seed.js              # Database seeding script
│   ├── package.json
│   └── server.js                # Express server entry point
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductList.js   # Product grid component
│   │   │   ├── Cart.js          # Shopping cart component
│   │   │   ├── Checkout.js      # Checkout form component
│   │   │   └── Receipt.js       # Order confirmation component
│   │   ├── context/
│   │   │   └── CartContext.js   # Cart state management
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── styles/
│   │   │   └── App.css          # Global styles
│   │   ├── App.js               # Main application component
│   │   └── index.js             # React application entry point
│   └── package.json
└── README.md

--------------------------------------------------------------------------------------------------------------------------------
🚀 Installation
Prerequisites
Node.js (v14 or higher) - Download here
MongoDB (local installation or MongoDB Atlas account)
Git - Download here
----------------------------------------------------------------
Step 1: Clone and Setup
bash
# Clone the repository or create the project structure
mkdir vibe-commerce
cd vibe-commerce
Step 2: Backend Setup
bash
# Create and navigate to backend directory
mkdir backend
cd backend

# Initialize package.json (copy from the code above)
# Then install dependencies
npm install
Step 3: Frontend Setup
bash
# Navigate to project root and create React app
cd ..
npx create-react-app frontend
cd frontend

# Install additional dependencies
npm install axios

# Replace default files with the provided code
🏃 Running the Application
Option A: Using Local MongoDB
Start MongoDB Service:

bash
# Windows (Run as Administrator)
net start MongoDB

# Mac (using Homebrew)
brew services start mongodb/brew/mongodb-community

# Linux
sudo systemctl start mongod
Seed the Database:

bash
cd backend
npm run seed
Start Backend Server:

bash
npm run dev
Backend will run on http://localhost:5000

Start Frontend Development Server:

bash
cd ../frontend
npm start
Frontend will run on http://localhost:3000
--------------------------------------------------------------------------------------------------------------------------------
I AM USING THIS BEACUSE I DONT HAVE THE PAYED VERSION DO I AM USING THE Mongodb Atlas
Option B: Using MongoDB Atlas (Cloud - Recommended)
Create MongoDB Atlas Account:

>Go to MongoDB Atlas
>Create a free cluster
>Get your connection string
>Create Environment File:

bash
cd backend
touch .env
Add to .env file:

env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/vibecommerce?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development

🔌 API Documentation
Base URL
text
http://localhost:5000/api
Products Endpoints
Method	Endpoint	Description	Body
GET	/products	Get all products	-
GET	/products/:id	Get single product	-
Cart Endpoints
Method	Endpoint	Description	Body
GET	/cart	Get cart with total	-
POST	/cart	Add item to cart	{ productId, quantity }
DELETE	/cart/:id	Remove item from cart	-
PUT	/cart/:id	Update item quantity	{ quantity }
Checkout Endpoint
Method	Endpoint	Description	Body
POST	/checkout	Process checkout	{ cartItems, customerInfo }
Health Check
Method	Endpoint	Description
GET	/health	Server status check
⚙️ Environment Variables
Create a .env file in the backend directory:

env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/vibecommerce

# Server Port
PORT=5000

# Environment
NODE_ENV=development


🎯 Usage Guide

>>Adding Products to Cart
>>Click "Add to Cart" on any product
>>View cart by clicking "Cart" in the navigation
>>Managing Cart Items
>>Update Quantity: Use +/- buttons in cart view
>>Remove Item: Click the × button next to any item
>>View Total: Cart total updates in real-time
>>Checkout Process
>>Click "Proceed to Checkout" from cart view
>>Fill in customer information (name and email required)
>>Submit the form to complete the order
>>View order confirmation receipt

🔮 Future Enhancements

>>User authentication and accounts
>>Product search and filtering
>>Product categories and pagination
>>Order history and tracking
>>Payment integration (Stripe/PayPal)
>>Product reviews and ratings
>>Inventory management
>>Admin dashboard
>Email notifications
>>Wishlist functionality

🤝 Contributing

Fork the project
>Create your feature branch (git checkout -b feature/AmazingFeature)
>Commit your changes (git commit -m 'Add some AmazingFeature')
>Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request


👥 Authors
    Bharath BS

🙏 Acknowledgments
>React team for the amazing framework
>MongoDB for the robust database solution
>Unsplash for product images
>Create React App for the quick setup