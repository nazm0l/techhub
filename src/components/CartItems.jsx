import { useContext } from "react";
import { CartContext } from "../context";
import CartItemCard from "./CartItemCard";

export default function CartItems() {
  const { cart, loading, error } = useContext(CartContext);

  if (loading) {
    return <p>Loading cart items...</p>;
  }

  if (error) {
    return <p>Error loading cart: {error.message}</p>;
  }

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="lg:col-span-2">
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
