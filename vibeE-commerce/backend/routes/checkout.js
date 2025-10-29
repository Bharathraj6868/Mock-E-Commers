const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST /api/checkout - Process checkout
router.post('/', async (req, res) => {
  try {
    const { cartItems, customerInfo } = req.body;
    const sessionId = req.headers['session-id'];

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID required'
      });
    }

    // Validate required customer info
    const { name, email } = customerInfo || {};
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

    // Get current cart
    const cart = await Cart.findOne({ sessionId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Create receipt
    const receipt = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customer: customerInfo,
      items: cart.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      total: cart.total,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    // Clear cart after successful checkout
    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      data: receipt,
      message: 'Order placed successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Checkout failed',
      error: error.message
    });
  }
});

module.exports = router;