import { useState } from "react";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Sidebar from "./components/Sidebar";
import useProducts from "./hooks/useProducts";
import CartProvider from "./provider/CartProvider";

function App() {
  const [page, setPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [],
    minRating: 0,
  });

  const { products, loading, error } = useProducts({
    query: searchQuery,
    category: filters.category,
    minRating: filters.minRating,
    priceRange: filters.priceRange,
  });

  return (
    <CartProvider>
      <Navbar
        setPage={setPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {page === "home" && (
        <MainLayout>
          <HeroSection />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Sidebar setFilters={setFilters} filters={filters} />
            <Products products={products} loading={loading} error={error} />
          </div>
        </MainLayout>
      )}
      {page === "cart" && <Cart />}
      <Footer />
    </CartProvider>
  );
}

export default App;
