import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function Cart() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">
            Your bag
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Shopping Cart
          </h1>
        </div>
        <a
          href="index.html"
          className="text-sm font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-2"
        >
          <span>Continue shopping</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <!-- Cart Items --> */}
        <CartItems />

        {/* <!-- Checkout Form --> */}
        <CartSummary />
      </div>
    </main>
  );
}
