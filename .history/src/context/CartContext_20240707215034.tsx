"use client";

import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM';
  payload: CartItem | string;
}

interface CartContextProps extends CartState {
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: string) => void;
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
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      const item = state.items[itemIndex];
      let newItems;
      if (item.quantity === 1) {
        newItems = state.items.filter(item => item.id !== itemId);
      } else {
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
          totalPrice: item.totalPrice - item.price,
        };
        newItems = [...state.items];
        newItems[itemIndex] = updatedItem;
      }
      return {
        ...state,
        items: newItems,
        totalQuantity: state.totalQuantity - 1,
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

  return (
    <CartContext.Provider value={{ ...state, addItemToCart, removeItemFromCart }}>
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
