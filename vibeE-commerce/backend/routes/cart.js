const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid');

// Helper function to get or create cart
const getOrCreateCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId }).populate('items.productId');
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
    await cart.save();
  }
  return cart;
};

// GET /api/cart - Get cart with total
router.get('/', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'] || uuidv4();
    const cart = await getOrCreateCart(sessionId);
    
    res.json({
      success: true,
      data: {
        sessionId,
        items: cart.items,
        total: cart.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
});

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const sessionId = req.headers['session-id'] || uuidv4();

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        name: product.name
      });
    }

    await cart.save();
    await cart.populate('items.productId');

    res.status(201).json({
      success: true,
      data: {
        sessionId,
        items: cart.items,
        total: cart.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const sessionId = req.headers['session-id'];
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
      });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.id
    );

    await cart.save();
    await cart.populate('items.productId');

    res.json({
      success: true,
      data: {
        items: cart.items,
        total: cart.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
});

// PUT /api/cart/:id - Update item quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const sessionId = req.headers['session-id'];

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === req.params.id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.productId');

    res.json({
      success: true,
      data: {
        items: cart.items,
        total: cart.total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart',
      error: error.message
    });
  }
});

module.exports = router;