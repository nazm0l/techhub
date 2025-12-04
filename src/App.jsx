import { useState } from "react";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Sidebar from "./components/Sidebar";
import useProducts from "./hooks/useProducts";

function App() {
  const [page, setPage] = useState("home");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [1000, 2000],
    minRating: 4,
  });

  const { products, loading, error } = useProducts(
    filters.category,
    filters.minRating
  );

  return (
    <>
      <Navbar setPage={setPage} />
      {page === "home" && (
        <MainLayout>
          <HeroSection />
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Sidebar setFilters={setFilters} filters={filters} />
            <Products products={products} loading={loading} error={error} />
          </div>
        </MainLayout>
      )}
      {page === "cart" && <Cart />}
      <Footer />
    </>
  );
}

export default App;
