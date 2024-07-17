"use client";

import React, { createContext, useReducer, useContext, ReactNode } from 'react';



interface CartState {
  pathname:str
}

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'INCREMENT_QUANTITY' | 'DECREMENT_QUANTITY';
  payload: CartItem | string;
}

interface CartContextProps extends CartState {
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
  incrementItemQuantity: (id: string) => void;
  decrementItemQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = action.payload as CartItem;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      const existingItem = state.items[existingItemIndex];
      let updatedItems;
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.totalPrice + newItem.price,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        const itemToAdd = {
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        };
        updatedItems = state.items.concat(itemToAdd);
      }
      return {
        ...state,
        items: updatedItems,
        totalQuantity: state.totalQuantity + 1,
      };
    case 'REMOVE_ITEM':
      const itemId = action.payload as string;
      return {
        ...state,
        items: state.items.filter(item => item.id !== itemId),
        totalQuantity: state.totalQuantity - 1,
      };
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + item.price }
            : item
        ),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price }
            : item
        ),
      };
    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalQuantity: 0 });

  const addItemToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const incrementItemQuantity = (id: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const decrementItemQuantity = (id: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  return (
    <CartContext.Provider value={{ ...state, addItemToCart, removeItemFromCart, incrementItemQuantity, decrementItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
