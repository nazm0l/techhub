import { CartContext } from "../context";
import useCart from "../hooks/useCart";

const CartProvider = ({ children }) => {
  const { cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart } = useCart();

  return (
    <CartContext.Provider value={{ cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
