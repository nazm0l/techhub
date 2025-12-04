import { useEffect, useState } from "react";
export default function Sidebar({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);

  // handle category filter
  const handleCategoryChange = (categoryName) => {
    const current = filters?.category;
    const isSelected = current === categoryName;
    if (isSelected) {
      setFilters({ ...filters, category: "" });
    } else {
      setFilters({ ...filters, category: categoryName });
    }
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, minRating: rating });
  };

  const fetchCategories = async () => {
    try {
      let url = "http://localhost:9000/categories";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Fetching categories failed: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.data) {
        setCategories(data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch {
      setCategories([]);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="md:col-span-1 space-y-4">
      <div className="soft-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          <button className="text-xs text-rose-500 font-semibold">Clear</button>
        </div>

        {/* <!-- Category Filter --> */}
        <div className="mb-6">
          <h4 className="font-medium text-sm mb-3 text-slate-700">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                className="flex items-center cursor-pointer"
                key={category.id}
              >
                <input
                  type="checkbox"
                  checked={filters.category === category.name}
                  onChange={() => handleCategoryChange(category.name)}
                  className="w-4 h-4 text-rose-500 rounded border-slate-300"
                />
                <span className="ml-3 text-sm text-slate-700">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* <!-- Price Filter --> */}
        <div className="mb-6">
          <h4 className="font-medium text-sm mb-3 text-slate-700">
            Price Range
          </h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="price"
                className="w-4 h-4 text-rose-500"
                checked={filters.priceRange.includes(0)}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setFilters({
                      ...filters,
                      priceRange: [...filters.priceRange, 0],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      priceRange: filters.priceRange.filter((p) => p !== 0),
                    });
                  }
                }}
              />
              <span className="ml-3 text-sm text-slate-700">$0 - $2000</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="price"
                className="w-4 h-4 text-rose-500"
                checked={filters.priceRange.includes(2001)}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setFilters({
                      ...filters,
                      priceRange: [...filters.priceRange, 2001],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      priceRange: filters.priceRange.filter((p) => p !== 2001),
                    });
                  }
                }}
              />
              <span className="ml-3 text-sm text-slate-700">$2000 - $5000</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="price"
                checked={filters.priceRange.includes(5001)}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setFilters({
                      ...filters,
                      priceRange: [...filters.priceRange, 5001],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      priceRange: filters.priceRange.filter((p) => p !== 5001),
                    });
                  }
                }}
                className="w-4 h-4 text-rose-500"
              />
              <span className="ml-3 text-sm text-slate-700">$5000+</span>
            </label>
          </div>
        </div>

        {/* <!-- Rating Filter --> */}
        <div>
          <h4 className="font-medium text-sm mb-3 text-slate-700">Rating</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-rose-500 rounded border-slate-300"
                checked={filters.minRating >= 4.5}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    handleRatingChange(4.5);
                  } else {
                    handleRatingChange(0);
                  }
                }}
              />
              <span className="ml-3 text-sm text-slate-700">4.5 ⭐ & up</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-rose-500 rounded border-slate-300"
                checked={filters.minRating >= 4.0}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    handleRatingChange(4.0);
                  } else {
                    handleRatingChange(0);
                  }
                }}
              />
              <span className="ml-3 text-sm text-slate-700">4.0 ⭐ & up</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-rose-500 rounded border-slate-300"
                checked={filters.minRating >= 3.5}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    handleRatingChange(3.5);
                  } else {
                    handleRatingChange(0);
                  }
                }}
              />
              <span className="ml-3 text-sm text-slate-700">3.5 ⭐ & up</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
