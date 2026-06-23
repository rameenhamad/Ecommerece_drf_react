import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../api/axios";
import { addToCart } from "../api/cart";
import {
  Star,
  Heart,
  Check,
  ChevronRight,
} from "lucide-react";

import mainImg from "../assets/Image/tech/image 34.png";

const ProductDetails = ({ setPage, productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const targetId = productId || 1;
        const response = await api.get(`products/products/${targetId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setProduct({
          id: 1,
          name: "Sample Product",
          description: "Product description goes here.",
          price: "99.00",
          stock: 10,
          is_active: true,
          image: null,
          category: { id: 1, name: "General" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <div className="container py-24 text-center text-lg font-medium text-secondary">
        Loading product...
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setPage("cart");
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setPage("login");
      return;
    }
    addToCart(product);
    try {
      await api.post("orders/", { products: [product.id] });
      setPage("orders");
    } catch {
      setPage("cart");
    }
  };

  return (
    <div className="container py-4">
      <div className="bg-white border border-[#DEE2E7] rounded-lg p-5 lg:p-8 flex flex-col lg:flex-row gap-8 mb-8 shadow-sm">
        <div className="lg:w-[450px] flex-shrink-0">
          <div className="border border-[#DEE2E7] rounded-lg p-8 mb-4 flex items-center justify-center bg-[#F7F7F7] aspect-square overflow-hidden group">
            <img
              src={getImageUrl(product.image) || mainImg}
              alt={product.name}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="flex-1">
          <div className={`flex items-center gap-2 mb-2 ${product.stock > 0 ? "text-[#00B517]" : "text-red-500"}`}>
            <Check size={20} />
            <span className="text-sm font-medium">
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-[#1C1C1C] mb-4">
            {product.name}
          </h1>

          <div className="bg-[#FFF0DF] p-4 rounded-lg mb-6">
            <div className="flex flex-col">
              <span className="text-lg lg:text-2xl font-bold text-[#FA3434] lg:text-3xl">
                {product.price}
              </span>
              <span className="text-xs text-[#505050]">per unit</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
              <span className="text-[#8B96A5]">Category:</span>
              <span className="col-span-2 lg:col-span-3 text-[#505050]">
                {product.category?.name || "General"}
              </span>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 text-sm border-t border-[#DEE2E7] pt-4">
              <span className="text-[#8B96A5]">Stock:</span>
              <span className="col-span-2 lg:col-span-3 text-[#505050]">
                {product.stock} units
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-[#DEE2E7] mb-8"></div>

          <div className="flex flex-wrap gap-4">
            <button
              className="flex-1 min-w-[150px] bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-bold transition-colors"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="flex-1 min-w-[150px] bg-[#E3F0FF] hover:bg-[#D1E9FF] text-primary py-3 rounded-lg font-bold transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-[#DEE2E7] rounded-lg text-primary hover:bg-shade transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="lg:w-[280px] space-y-4">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-md bg-[#E3F0FF] flex items-center justify-center text-primary font-bold text-xl uppercase">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-[#1C1C1C] font-normal">Supplier</span>
                <span className="text-[#505050] text-sm">
                  Verified Seller
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
                Send inquiry
              </button>
              <button className="w-full bg-white text-primary border border-[#DEE2E7] py-2 rounded-lg text-sm font-medium hover:bg-shade transition-colors">
                Seller's profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#DEE2E7] rounded-lg p-6 lg:p-8 mb-8">
        <h3 className="text-lg font-bold mb-4">Description</h3>
        <p className="text-[#505050] text-sm lg:text-base leading-relaxed">
          {product.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
