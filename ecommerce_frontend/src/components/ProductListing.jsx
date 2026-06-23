import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../api/axios";
import {
  ChevronRight,
  Grid,
  List,
  ChevronDown,
  Heart,
  X,
} from "lucide-react";

import canonImg from "../assets/Image/tech/image 29.png";
import actionImg from "../assets/Image/tech/6.png";
import laptopImg from "../assets/Image/tech/image 23.png";
import watchImg from "../assets/Image/tech/8.png";
import headphonesImg from "../assets/Image/tech/image 32.png";
import phone1 from "../assets/Image/tech/image 33.png";
import phone2 from "../assets/Image/tech/image 34.png";

const ProductListing = ({ setPage, navigateToDetail, searchQuery }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [page, setPageNum] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    api.get("products/category/").then((res) => {
      const cats = res.data.results || res.data;
      if (Array.isArray(cats)) setCategories(cats);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const params = { page };
    if (searchQuery) params.search = searchQuery;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (selectedCategory) params.category = selectedCategory;
    api
      .get("products/products/", { params })
      .then((res) => {
        setProducts(res.data.results || res.data);
        setTotalCount(res.data.count || 0);
      })
      .catch((err) => console.log(err));
  }, [searchQuery, page, minPrice, maxPrice, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory(null);
    setPageNum(1);
  };

  const selectedCatName = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.name || "Category"
    : "All";

  return (
    <div className="container py-4">
      <div className="flex items-center gap-2 text-[#8B96A5] text-sm mb-6">
        <span
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => setPage("home")}
        >
          Home
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C1C] font-normal">{selectedCatName}</span>
      </div>

      <div className="flex gap-6">
        <aside className="w-[240px] flex-shrink-0 space-y-2">
          {/* Category */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Category <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <ul className="space-y-3 text-[#505050] text-sm">
              <li
                className={`cursor-pointer ${!selectedCategory ? "text-primary font-medium" : "hover:text-primary"}`}
                onClick={() => { setSelectedCategory(null); setPageNum(1); }}
              >
                All
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`cursor-pointer ${selectedCategory === cat.id ? "text-primary font-medium" : "hover:text-primary"}`}
                  onClick={() => { setSelectedCategory(cat.id); setPageNum(1); }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="border-t border-[#DEE2E7] py-3">
            <h4 className="font-bold text-[#1C1C1C] mb-3 flex justify-between items-center cursor-pointer">
              Price range <ChevronDown className="w-4 h-4 opacity-50" />
            </h4>
            <div className="space-y-4">
              <div className="relative h-6 flex items-center">
                <div className="w-full h-1 bg-[#DEE2E7] rounded"></div>
                <div className="absolute left-[20%] right-[30%] h-1 bg-primary rounded"></div>
                <div className="absolute left-[20%] w-4 h-4 bg-white border-2 border-primary rounded-full -ml-2"></div>
                <div className="absolute right-[30%] w-4 h-4 bg-white border-2 border-primary rounded-full -mr-2"></div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-[#1C1C1C] text-xs mb-1">Min</p>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[#1C1C1C] text-xs mb-1">Max</p>
                  <input
                    type="number"
                    placeholder="999999"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-[#DEE2E7] rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
              <button
                onClick={() => setPageNum(1)}
                className="w-full bg-white border border-[#DEE2E7] text-primary py-2 rounded-md text-sm font-medium hover:bg-shade transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex items-center justify-between mb-4">
            <span className="text-[#1C1C1C] text-sm">
              {totalCount} items in{" "}
              <span className="font-bold">{selectedCatName}</span>
            </span>
            <div className="flex items-center gap-4">
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
                <div
                  className={`p-2 border-r border-[#DEE2E7] cursor-pointer transition-colors ${viewMode === "grid" ? "bg-[#EFF2F4]" : "hover:bg-shade"}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={18} className="text-[#1C1C1C]" />
                </div>
                <div
                  className={`p-2 cursor-pointer transition-colors ${viewMode === "list" ? "bg-[#EFF2F4]" : "hover:bg-shade"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={18} className="text-[#1C1C1C]" />
                </div>
              </div>
            </div>
          </div>

          {(selectedCategory || minPrice || maxPrice) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {selectedCategory && (
                <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md bg-white text-dark text-sm">
                  <span>{selectedCatName}</span>
                  <X
                    size={14}
                    className="text-[#8B96A5] cursor-pointer hover:text-dark"
                    onClick={() => { setSelectedCategory(null); setPageNum(1); }}
                  />
                </div>
              )}
              {minPrice && (
                <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md bg-white text-dark text-sm">
                  <span>Min: {minPrice}</span>
                  <X
                    size={14}
                    className="text-[#8B96A5] cursor-pointer hover:text-dark"
                    onClick={() => setMinPrice("")}
                  />
                </div>
              )}
              {maxPrice && (
                <div className="flex items-center gap-2 px-3 py-1.5 border border-primary rounded-md bg-white text-dark text-sm">
                  <span>Max: {maxPrice}</span>
                  <X
                    size={14}
                    className="text-[#8B96A5] cursor-pointer hover:text-dark"
                    onClick={() => setMaxPrice("")}
                  />
                </div>
              )}
              <button
                onClick={clearFilters}
                className="text-primary text-sm font-normal hover:underline ml-2"
              >
                Clear all filter
              </button>
            </div>
          )}

          {viewMode === "list" ? (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#DEE2E7] rounded-lg p-5 flex gap-6 hover:shadow-md transition-shadow group cursor-pointer relative"
                  onClick={() => navigateToDetail(product.id)}
                >
                  <div className="w-[210px] h-[210px] lg:w-[240px] lg:h-[240px] flex-shrink-0 flex items-center justify-center bg-[#F7F7F7] rounded-lg p-6 relative overflow-hidden group">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <button
                    className="absolute right-5 top-5 w-10 h-10 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart size={20} />
                  </button>

                  <div className="flex-1 py-1">
                    <h3 className="text-[#1C1C1C] text-base font-semibold group-hover:text-primary transition-colors mb-3">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-[#1C1C1C]">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    <p className="text-[#505050] text-sm leading-relaxed mb-4 line-clamp-2 max-w-2xl">
                      {product.description}
                    </p>

                    <button className="text-primary font-bold text-sm bg-transparent border-none p-0 hover:underline">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#DEE2E7] rounded-lg p-4 hover:shadow-[0px_8px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center cursor-pointer"
                  onClick={() => navigateToDetail(product.id)}
                >
                  <div className="w-full aspect-square flex items-center justify-center mb-4 bg-[#F7F7F7] rounded-md p-6 overflow-hidden">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#1C1C1C]">
                            {product.price}
                          </span>
                          <button
                            className="w-8 h-8 border border-[#DEE2E7] rounded-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Heart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-[#505050] text-[13px] leading-[1.4] line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end mt-8">
            <div className="flex items-center gap-3">
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
                <div className="px-3 py-2 border-r border-[#DEE2E7] cursor-pointer hover:bg-shade transition-colors flex items-center">
                  <span className="text-secondary text-sm">Show {pageSize}</span>
                  <ChevronDown size={14} className="ml-2" />
                </div>
              </div>
              <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden bg-white">
                <div
                  className={`px-3 py-2 border-r border-[#DEE2E7] flex items-center ${page <= 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-shade"} text-dark transition-colors`}
                  onClick={() => page > 1 && setPageNum(page - 1)}
                >
                  {"<"}
                </div>
                {pageNumbers.map((num) => (
                  <div
                    key={num}
                    onClick={() => setPageNum(num)}
                    className={`px-4 py-2 border-r border-[#DEE2E7] text-sm cursor-pointer transition-colors ${
                      num === page
                        ? "bg-white font-bold text-dark"
                        : "hover:bg-shade text-dark"
                    }`}
                  >
                    {num}
                  </div>
                ))}
                <div
                  className={`px-3 py-2 flex items-center transition-colors ${page >= totalPages ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-shade"} text-dark`}
                  onClick={() => page < totalPages && setPageNum(page + 1)}
                >
                  {">"}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
