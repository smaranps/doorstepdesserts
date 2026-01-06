
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { CartItem } from '@/lib/types';

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

// Helper to create a unique ID for a cart item based on its product ID and variant ID
const getCartItemId = (itemId: string, variantId: string | null) => {
    return variantId ? `${itemId}-${variantId}` : itemId;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((itemToAdd: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === itemToAdd.id && item.variant?.id === itemToAdd.variant?.id
      );

      if (existingItem) {
        // If item exists, map over the items and update the quantity of the matching one
        return prevItems.map((item) =>
          item.id === itemToAdd.id && item.variant?.id === itemToAdd.variant?.id
            ? { ...item, quantity: item.quantity + (itemToAdd.quantity || 1) }
            : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, { ...itemToAdd, quantity: itemToAdd.quantity || 1 }];
      }
    });
  }, []);

  const removeItem = useCallback((itemId: string, variantId: string | null) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.variant?.id === variantId)
      )
    );
  }, []);

  const updateQuantity = useCallback((itemId: string, variantId: string | null, quantity: number) => {
    setItems((prevItems) => {
      // If quantity is 0 or less, remove the item
      if (quantity <= 0) {
        return prevItems.filter(
          (item) => !(item.id === itemId && item.variant?.id === variantId)
        );
      }
      
      // Otherwise, update the quantity of the matching item
      return prevItems.map((item) => {
        if (item.id === itemId && item.variant?.id === variantId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
