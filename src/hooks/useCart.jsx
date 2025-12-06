import { useEffect, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:9000/cart");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCart(data.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:9000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to add item to cart");
      }
      fetchCart(); 
    } catch (error) {
      setError(error);
      console.error("Error adding to cart:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (id, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:9000/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to update cart item");
      }
      fetchCart(); 
    } catch (error) {
      setError(error);
      console.error("Error updating cart item:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:9000/cart/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to remove item from cart");
      }
      fetchCart(); 
    } catch (error) {
      setError(error);
      console.error("Error removing from cart:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:9000/cart", {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to clear cart");
      }
      fetchCart(); 
    } catch (error) {
      setError(error);
      console.error("Error clearing cart:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart };
};

export default useCart;
