import { useContext } from "react";
import { CartContext } from "../context";

export default function CartItemCard({ item }) {
  const { removeFromCart, updateCartItem } = useContext(CartContext);
  const { product, quantity, id: cartItemId } = item;

  const { title, price, image, id: productId } = product;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(cartItemId, newQuantity);
  };

  return (
    <div className="soft-card p-4 flex gap-4">
      <img
        src={`http://localhost:9000/${image}`}
        alt={title}
        className="w-24 h-24 object-cover rounded-lg bg-slate-100"
      />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
            <p className="text-slate-500 text-sm">
              SKU: {productId} · {title}
            </p>
          </div>
          <button
            className="text-slate-400 hover:text-rose-500"
            aria-label="Remove"
            onClick={() => removeFromCart(cartItemId)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-300"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              −
            </button>
            <span className="text-sm font-semibold">{quantity}</span>
            <button
              className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:border-rose-300"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
          <span className="text-2xl font-bold text-slate-900">
            ${(price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
