import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const index = cartItems.find((item) => item.id === productToAdd.id);
  if (index) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRem) => {
  const index = cartItems.find((item) => item.id === productToRem.id);
  if (index.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRem.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, productToDel) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDel.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  deleteFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRem) => {
    setCartItems(removeCartItem(cartItems, productToRem));
  };

  const deleteFromCart = (productToDel) => {
    setCartItems(deleteCartItem(cartItems, productToDel));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    setCartCount,
    removeItemFromCart,
    deleteFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
