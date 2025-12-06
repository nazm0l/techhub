import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import SortProducts from "./SortProducts";

export default function Products({ products, loading, error }) {
  const [sortBy, setSortBy] = useState("Newest");

  const getSortedProducts = () => {
    if (!products || products.length === 0) return [];

    const sorted = [...products];

    switch (sortBy) {
      case "Newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Price: Low to High":
        return sorted.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="md:col-span-3">
      {/* <!-- Sorting Options --> */}
      <SortProducts
        sortedProducts={sortedProducts}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* <!-- Products Grid --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading.state &&
          Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        {sortedProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}
