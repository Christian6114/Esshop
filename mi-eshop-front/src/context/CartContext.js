import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(parseFloat(newTotal.toFixed(2)));
    setCartItemCount(totalItems);
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id_producto === product.id_producto);
      
      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id_producto === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeCompletely = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id_producto !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    total,
    addToCart,
    removeFromCart,
    removeCompletely,
    clearCart,
    showCart,
    setShowCart,
    cartItemCount
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