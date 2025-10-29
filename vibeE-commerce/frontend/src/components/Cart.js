import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ onCheckout }) => {
  const { items, total, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemove = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await removeFromCart(productId);
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="cart">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <span>Add some products to get started!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {items.map((item) => {
          // product may be null if the product was removed from the products collection
          const product = item.productId || { name: item.name || 'Deleted product', image: 'https://via.placeholder.com/150' };
          const key = (product && product._id) ? product._id : item._id;

          return (
            <div key={key} className="cart-item">
              <div className="item-image">
                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
              </div>
              <div className="item-details">
                <h3>{product.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(product._id || item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product._id || item._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => handleRemove(product._id || item._id)}
                className="remove-btn"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
      <div className="cart-summary">
        <div className="total">
          <strong>Total: ₹{total.toFixed(2)}</strong>
        </div>
        <button onClick={onCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;