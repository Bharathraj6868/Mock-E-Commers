import React from 'react';

const Receipt = ({ receipt, onContinueShopping }) => {
  return (
    <div className="receipt">
      <div className="receipt-content">
        <div className="receipt-header">
          <h2>🎉 Order Confirmed!</h2>
          <p>Thank you for your purchase!</p>
        </div>

        <div className="receipt-details">
          <div className="receipt-info">
            <div className="info-row">
              <span>Order ID:</span>
              <strong>{receipt.orderId}</strong>
            </div>
            <div className="info-row">
              <span>Date:</span>
              <span>{new Date(receipt.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="info-row">
              <span>Time:</span>
              <span>{new Date(receipt.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="customer-info">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {receipt.customer.name}</p>
            <p><strong>Email:</strong> {receipt.customer.email}</p>
            {receipt.customer.address && (
              <p><strong>Address:</strong> {receipt.customer.address}</p>
            )}
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            {receipt.items.map((item, index) => (
              <div key={index} className="receipt-item">
                <div className="item-name">{item.name}</div>
                <div className="item-quantity">× {item.quantity}</div>
                <div className="item-subtotal">₹{item.subtotal.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="receipt-total">
            <strong>Total: ₹{receipt.total.toFixed(2)}</strong>
          </div>
        </div>

        <div className="receipt-footer">
          <p>A confirmation email has been sent to {receipt.customer.email}</p>
          <button onClick={onContinueShopping} className="continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;