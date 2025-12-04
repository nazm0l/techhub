import { useEffect, useState } from "react";

const useProducts = (category, minRating) => {
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

      let url = `http://localhost:9000/products?category=${category}&minRating=${minRating}`;

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
  }, [category, minRating]);

  return {
    products,
    error,
    loading,
  };
};

export default useProducts;
