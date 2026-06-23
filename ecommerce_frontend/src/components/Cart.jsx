import React, { useState, useEffect } from "react";
import { getImageUrl } from "../api/axios";
import api from "../api/axios";
import { getCart, removeFromCart, updateQuantity, clearCart } from "../api/cart";
import {
  ChevronDown,
  ArrowLeft,
  ShieldCheck,
  Truck,
  MessageSquare,
} from "lucide-react";

import item1 from "../assets/Image/tech/6.png";
import item2 from "../assets/Image/tech/8.png";
import item3 from "../assets/Image/tech/image 23.png";

const fallbackImages = [item1, item2, item3];

const Cart = ({ setPage }) => {
  const [cartItems, setCartItems] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const resolveImage = (item) => {
    if (!item.image) {
      const idx = cartItems.indexOf(item);
      return fallbackImages[idx % fallbackImages.length];
    }
    if (
      item.image.startsWith("http") ||
      item.image.startsWith("/assets") ||
      item.image.startsWith("data:")
    ) {
      return item.image;
    }
    return getImageUrl(item.image) || fallbackImages[0];
  };

  const handleQuantityChange = (id, newQty) => {
    updateQuantity(id, newQty);
    setCartItems(getCart());
    setActiveDropdown(null);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const handleRemoveAll = () => {
    clearCart();
    setCartItems([]);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setPage("login");
      return;
    }
    try {
      const productIds = cartItems.map((item) => item.id);
      await api.post("orders/", { products: productIds });
      clearCart();
      setCartItems([]);
      setPage("orders");
    } catch (err) {
      alert("Checkout failed. Please try again.");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const discount = cartItems.length > 0 ? 60.0 : 0.0;
  const tax = cartItems.length > 0 ? 14.0 : 0.0;
  const total = Math.max(0, subtotal - discount + tax);

  return (
    <div className="container px-4 mx-auto py-6">
      <h1 className="text-2xl font-bold text-[#1C1C1C] mb-6">
        My cart ({cartItems.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4 order-1 lg:order-1">
          <div className="bg-white border border-[#DEE2E7] rounded-lg overflow-hidden">
            {cartItems.length === 0 ? (
              <div className="p-12 text-center text-[#8B96A5]">
                Your shopping cart is empty.
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`p-4 sm:p-6 flex flex-row gap-4 lg:gap-6 items-start ${
                    index !== cartItems.length - 1
                      ? "border-b border-[#DEE2E7]"
                      : ""
                  }`}
                >
                  <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] border border-[#DEE2E7] rounded-lg p-2 sm:p-3 flex items-center justify-center bg-[#F7F7F7] flex-shrink-0 overflow-hidden">
                    <img
                      src={resolveImage(item)}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row justify-between gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <h3 className="font-medium sm:font-semibold text-sm sm:text-base text-[#1C1C1C] hover:text-primary cursor-pointer transition-colors max-w-md line-clamp-2 sm:line-clamp-none">
                        {item.title}
                      </h3>
                      <div className="text-[#8B96A5] text-xs sm:text-sm space-y-0.5">
                        <p>Size: medium, Color: standard</p>
                        <p>Seller: Verified Seller Marketplace</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="px-2.5 py-1 border border-[#DEE2E7] rounded-md text-[#FA3434] text-xs font-semibold hover:bg-[#FFF0F0] transition-colors"
                        >
                          Remove
                        </button>
                        <button className="px-2.5 py-1 border border-[#DEE2E7] rounded-md text-primary text-xs font-semibold hover:bg-shade transition-colors">
                          Save for later
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 min-w-full md:min-w-[120px] pt-2 md:pt-0 border-t border-dashed md:border-t-0 border-[#DEE2E7] relative">
                      <span className="text-base sm:text-lg font-bold text-[#1C1C1C]">
                        {(item.price * item.qty).toFixed(2)}
                      </span>

                      <div className="relative">
                        <div
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === item.id ? null : item.id,
                            )
                          }
                          className="flex items-center gap-2 border border-[#DEE2E7] rounded-md px-2.5 py-1.5 bg-white cursor-pointer hover:bg-shade transition-colors"
                        >
                          <span className="text-xs sm:text-sm text-dark">
                            Qty: {item.qty}
                          </span>
                          <ChevronDown size={14} className="opacity-50" />
                        </div>

                        {activeDropdown === item.id && (
                          <div className="absolute right-0 bottom-10 md:bottom-auto md:top-10 bg-white border border-[#DEE2E7] rounded-md shadow-xl z-30 w-20 overflow-hidden">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div
                                key={num}
                                onClick={() =>
                                  handleQuantityChange(item.id, num)
                                }
                                className={`px-3 py-1 text-xs sm:text-sm hover:bg-shade cursor-pointer text-center ${item.qty === num ? "bg-[#E5F1FF] font-bold text-primary" : ""}`}
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-[#DEE2E7]">
            <button
              className="flex items-center gap-2 bg-primary text-white px-4 sm:px-5 py-2 rounded-md text-sm font-bold hover:bg-primary-dark transition-colors"
              onClick={() => setPage("listing")}
            >
              <ArrowLeft size={16} />
              Back to shop
            </button>
            <button
              onClick={handleRemoveAll}
              className="text-primary text-sm font-bold hover:underline"
            >
              Remove all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E3F0FF] flex items-center justify-center text-primary flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[#1C1C1C] font-semibold text-sm">
                  Secure Checkout
                </p>
                <p className="text-[#8B96A5] text-xs">
                  Encrypted transaction assurance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E3F0FF] flex items-center justify-center text-primary flex-shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="text-[#1C1C1C] font-semibold text-sm">
                  Customer Support
                </p>
                <p className="text-[#8B96A5] text-xs">
                  24/7 technical help desk setup
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E3F0FF] flex items-center justify-center text-primary flex-shrink-0">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-[#1C1C1C] font-semibold text-sm">
                  Free Shipping
                </p>
                <p className="text-[#8B96A5] text-xs">
                  On minimum baseline order totals
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[280px] space-y-4 order-2 lg:order-2">
          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 sm:p-5">
            <p className="text-[#505050] text-sm mb-3">Have a coupon?</p>
            <div className="flex border border-[#DEE2E7] rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Add coupon"
                className="flex-1 px-3 py-1.5 outline-none text-sm w-full"
              />
              <button className="bg-white border-l border-[#DEE2E7] px-4 py-1.5 text-primary font-bold text-sm hover:bg-shade transition-colors">
                Apply
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#DEE2E7] rounded-lg p-4 sm:p-5 shadow-sm">
            <div className="space-y-3 mb-4 text-sm sm:text-base">
              <div className="flex justify-between text-[#505050]">
                <span>Subtotal:</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#FA3434]">
                <span>Discount:</span>
                <span>- {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#00B517]">
                <span>Tax:</span>
                <span>+ {tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="h-[1px] bg-[#DEE2E7] mb-4"></div>

            <div className="flex justify-between text-base sm:text-lg font-bold text-[#1C1C1C] mb-5">
              <span>Total:</span>
              <span>{total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#00B517] hover:bg-[#00A015] text-white py-3 rounded-md font-bold text-base sm:text-lg transition-colors shadow-sm"
            >
              Checkout
            </button>

            <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-40">
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
              <div className="w-8 h-5 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
