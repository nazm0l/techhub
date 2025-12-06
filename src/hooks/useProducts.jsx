import { useEffect, useState } from "react";

const useProducts = ({ query, category, minRating, priceRange }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading({
        state: true,
        message: "Fetching products...",
      });

      let url = `http://localhost:9000/products?q=${query || ""}`;
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      if (minRating) {
        url += `&minRating=${minRating}`;
      }
      if (priceRange && priceRange.length > 0) {
        let minPrice = Infinity;
        let maxPrice = 0;
        priceRange.forEach((rangeStart) => {
          if (rangeStart === 0) {
            minPrice = Math.min(minPrice, 0);
            maxPrice = Math.max(maxPrice, 2000);
          } else if (rangeStart === 2001) {
            minPrice = Math.min(minPrice, 2001);
            maxPrice = Math.max(maxPrice, 5000);
          } else if (rangeStart === 5001) {
            minPrice = Math.min(minPrice, 5001);
            maxPrice = Math.max(maxPrice, 999999);
          }
        });
        if (minPrice !== Infinity) url += `&minPrice=${minPrice}`;
        if (maxPrice !== 0) url += `&maxPrice=${maxPrice}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = `Fetching products failed: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setProducts(data.data);
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading({
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query, category, minRating, priceRange]);

  return {
    products,
    error,
    loading,
  };
};

export default useProducts;
