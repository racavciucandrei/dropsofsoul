import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/types';

// Define the cart item type
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

// Define the cart context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  cartCount: number;
  cartTotal: number;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

// Cart provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count and total
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      // Convert product.id to string for consistent comparison
      const productId = String(product.id);
      
      // Check if the product is already in the cart
      const existingItemIndex = prevCart.findIndex(item => String(item.id) === productId);
      
      if (existingItemIndex >= 0) {
        // If the product is already in the cart, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // If the product is not in the cart, add it
        return [...prevCart, { id: productId, product, quantity }];
      }
    });
    
    // Open the cart when adding items
    setIsCartOpen(true);
  };

  // Remove a product from the cart
  const removeFromCart = (productId: string | number) => {
    // Convert productId to string for consistent comparison
    const idToRemove = String(productId);
    
    setCart(prevCart => prevCart.filter(item => String(item.id) !== idToRemove));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (productId: string | number, quantity: number) => {
    // Convert productId to string for consistent comparison
    const idToUpdate = String(productId);
    
    if (quantity <= 0) {
      removeFromCart(idToUpdate);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        String(item.id) === idToUpdate ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle the cart open/closed
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Close the cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Provide the cart context to children
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        closeCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
