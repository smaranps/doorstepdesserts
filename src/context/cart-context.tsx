
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem, DessertVariant } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string, variantId: string | null) => void;
  updateQuantity: (itemId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (itemToAdd: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === itemToAdd.id && item.variant?.id === itemToAdd.variant?.id
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [...prevItems, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: string, variantId: string | null) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.variant?.id === variantId)
      )
    );
  };

  const updateQuantity = (itemId: string, variantId: string | null, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.variant?.id === variantId) {
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
