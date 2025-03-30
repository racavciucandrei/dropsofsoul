import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/types';

// Define the shape of our cart context
interface CartContextProps {
  cartItems: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

// Define the shape of a cart item
interface CartItem extends Product {
  quantity: number;
}

// Create the cart context with a default value
const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getItemQuantity: () => 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

// Create a custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Create the cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Get cart items from local storage on initial load
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  // Save cart items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addItem = (product: Product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, increase its quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to get the quantity of an item in the cart
  const getItemQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (id: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        const newItems = [...prevItems];
        newItems[itemIndex].quantity += 1;
        return newItems;
      }

      return prevItems;
    });
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (id: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        const newItems = [...prevItems];
        if (newItems[itemIndex].quantity > 1) {
          newItems[itemIndex].quantity -= 1;
          return newItems;
        } else {
          // If the quantity is 1, remove the item from the cart
          return prevItems.filter(item => item.id !== id);
        }
      }

      return prevItems;
    });
  };

  // Provide the cart context value
  const cartContextValue: CartContextProps = {
    cartItems,
    addItem,
    removeItem,
    clearCart,
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
