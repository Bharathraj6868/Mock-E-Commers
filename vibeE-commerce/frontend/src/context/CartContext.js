import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartService } from '../services/api';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        sessionId: action.payload.sessionId
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

const initialState = {
  items: [],
  total: 0,
  sessionId: null,
  loading: false,
  error: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartService.getCart();
      // server returns { success: true, data: { sessionId, items, total } }
      dispatch({ 
        type: 'SET_CART', 
        payload: response.data.data 
      });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.message 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartService.addToCart(productId, quantity);
      dispatch({ 
        type: 'ADD_ITEM', 
        payload: response.data.data 
      });
      return { success: true };
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.message 
      });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartService.removeFromCart(productId);
      dispatch({ 
        type: 'REMOVE_ITEM', 
        payload: response.data.data 
      });
      return { success: true };
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.message 
      });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await cartService.updateQuantity(productId, quantity);
      dispatch({ 
        type: 'UPDATE_QUANTITY', 
        payload: response.data.data 
      });
      return { success: true };
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.message 
      });
      return { success: false, error: error.message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};