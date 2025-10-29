const mongoose = require('mongoose');
const Product = require('../models/Product');

// Database connection
const connectDB = async () => {
  try {
    require('dotenv').config();
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 7999.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Smart Fitness Watch",
    price: 6099.00,
    description: "Advanced fitness tracking with heart rate monitor",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Organic Cotton T-Shirt",
    price: 500.00,
    description: "Comfortable and sustainable cotton t-shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    category: "Clothing",
    inStock: true
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 400.99,
    description: "Keep your drinks hot or cold for hours",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300",
    category: "Accessories",
    inStock: true
  },
  {
    name: "Birthaday cake with CAKE BOX",
    price: 449.99,
    description: "High-performance lens for professional photography",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300",
    category: "Electronics",
    inStock: true
  },
  {
    name: "Yoga Mat Premium",
    price: 599.99,
    description: "Non-slip yoga mat for all types of exercises",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300",
    category: "Fitness",
    inStock: true
  },
  {
    name: "Ceramic Coffee Mug Set",
    price: 349.99,
    description: "Set of 4 beautiful handcrafted ceramic mugs",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2T1MTHjniA6x5vmEK2tz3f4QZ4xfnAIfoSjUGkom60SJK7jEr9lVpXYWs7LlVQZ_RI9hnbXuox69WtVHDrkx7fzbDGdMxF8mptzVtdsbnZaUPgxAYf_8p",
    category: "Home",
    inStock: true
  },
  {
    name: "Wireless Airbuds",
    price: 10000.99,
    description: "Fast wireless charging for all compatible devices",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300",
    category: "Electronics",
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert new products
    await Product.insertMany(products);
    console.log('Database seeded successfully with 8 products');
    
    // Display the inserted products
    const insertedProducts = await Product.find({});
    console.log('\nInserted Products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();