"use client";

import React, { createContext, useReducer, useContext, ReactNode } from 'react';



interface AppState {
  pathname: string
}

interface AppAction {
  type: 'ADD_ITEM';
  payload: string;
}

interface AppContextProps extends AppState {
  addPathname: (id: string) => void;
}

const CartContext = createContext<AppContextProps | undefined>(undefined);

const cartReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = action.payload;

      return {
        ...state,
        pathname: updatedItems,
        totalQuantity: state.totalQuantity + 1,
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
