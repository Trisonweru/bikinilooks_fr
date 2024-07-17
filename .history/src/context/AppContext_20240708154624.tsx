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

const AppContext = createContext<AppContextProps | undefined>(undefined);

const cartReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = action.payload;

      return {
        ...state,
        pathname: newItem,
      };
    default:
      return state;
  }
};

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { pathname: "" });

  const addPathname = (item: string) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };



  return (
    <AppContext.Provider value={{ ...state, addPathname, }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppCtx = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default AppProvider;
