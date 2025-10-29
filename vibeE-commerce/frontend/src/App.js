import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Receipt from './components/Receipt';
import { useCart } from './context/CartContext';

function App() {
  const [currentView, setCurrentView] = useState('products');
  const [receipt, setReceipt] = useState(null);
  const { items } = useCart();

  const renderView = () => {
    switch (currentView) {
      case 'cart':
        return <Cart onCheckout={() => setCurrentView('checkout')} />;
      case 'checkout':
        return (
          <Checkout
            onSuccess={(receiptData) => {
              setReceipt(receiptData);
              setCurrentView('receipt');
            }}
            onCancel={() => setCurrentView('cart')}
          />
        );
      case 'receipt':
        return (
          <Receipt
            receipt={receipt}
            onContinueShopping={() => {
              setReceipt(null);
              setCurrentView('products');
            }}
          />
        );
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 onClick={() => setCurrentView('products')} className="logo">
            Vibe Commerce
          </h1>
          <nav className="nav">
            <button
              onClick={() => setCurrentView('products')}
              className={`nav-btn ${currentView === 'products' ? 'active' : ''}`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentView('cart')}
              className={`nav-btn ${currentView === 'cart' ? 'active' : ''}`}
            >
              Cart ({items?.length || 0})
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {renderView()}
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025-26 Vibe Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;