import { useContext } from "react";
import { CartContext } from "../context";

export default function CartSummary() {
  const { cart, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 0;
  const taxRate = 0.0;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="lg:col-span-1">
      <div className="soft-card p-6 sticky top-24 space-y-6">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {/* <!-- Summary --> */}
        <div className="space-y-3 border-slate-200">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Shipping</span>
            <span className="text-emerald-600 font-semibold">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-3 text-slate-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          className="w-full button-primary py-2.5 rounded-lg font-semibold"
          onClick={clearCart}
          disabled={cart.length === 0}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
