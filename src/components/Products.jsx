import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function Products({ products, loading, error }) {
  return (
    <div className="md:col-span-3">
      {/* <!-- Sorting Options --> */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-600">Showing 12 products</p>
        <div className="flex items-center gap-2">
          <label for="sort" className="text-sm font-medium text-slate-700">
            Sort by:
          </label>
          <select
            id="sort"
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
          >
            <option>Newest</option>
            <option>Oldest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* <!-- Products Grid --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading.state &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}
