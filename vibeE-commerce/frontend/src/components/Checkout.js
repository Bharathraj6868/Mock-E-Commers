import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { checkoutService } from '../services/api';

const Checkout = ({ onSuccess, onCancel }) => {
  const { items, total, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await checkoutService.processCheckout(items, customerInfo);
      
      if (response.data.success) {
        clearCart();
        onSuccess(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return customerInfo.name && customerInfo.email && customerInfo.address;
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      
      <div className="checkout-content">
        <div className="order-summary">
          <h3>Order Summary</h3>
          {(!items || items.length === 0) ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            items.map((item) => {
              const product = item.productId || { name: item.name || 'Deleted product' };
              const key = (product && product._id) ? product._id : item._id;
              return (
                <div key={key} className="checkout-item">
                  <span>{product.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              );
            })
          )}
          <div className="checkout-total">
            <strong>Total: ₹{total.toFixed(2)}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Customer Information</h3>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={customerInfo.zipCode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="checkout-actions">
            <button
              type="button"
              onClick={onCancel}
              className="cancel-btn"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className="submit-btn"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;