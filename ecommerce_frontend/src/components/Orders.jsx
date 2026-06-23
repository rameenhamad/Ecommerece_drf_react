import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../api/axios";
import { addToCart } from "../api/cart";

const Orders = ({ setPage }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get("orders/");
        setOrderItems(response.data);
      } catch (error) {
        console.error("Error fetching secure order histories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container py-8 text-center font-medium text-secondary">
        Loading orders history...
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Recent Orders</h1>
        <div className="space-y-6">
          {orderItems.map((order) => (
            <div
              key={order.id}
              className="border border-[#DEE2E7] rounded-lg overflow-hidden"
            >
              <div className="bg-[#F7FAFC] p-4 border-b border-[#DEE2E7] flex justify-between items-center whitespace-nowrap overflow-x-auto no-scrollbar gap-4">
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-[#8B96A5]">ORDER PLACED</p>
                    <p className="font-medium">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-[#8B96A5]">TOTAL</p>
                    <p className="font-medium">
                      {order.products?.reduce(
                        (sum, p) => sum + parseFloat(p.price || 0),
                        0,
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B96A5]">SHIP TO</p>
                    <p className="font-medium text-primary cursor-pointer hover:underline">
                      {order.user?.username || "John Doe"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[#8B96A5] text-sm text-right">
                    ORDER # 112-987654-{order.id}
                  </p>
                </div>
              </div>
              {order.products?.map((product) => (
                <div
                  key={product.id}
                  className="p-6 flex gap-6 border-t border-[#DEE2E7]"
                >
                  <div className="w-20 h-20 bg-white border border-[#DEE2E7] rounded p-2 flex items-center justify-center">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-primary hover:underline cursor-pointer mb-2">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => { addToCart(product); setPage("cart"); }}
                      className="bg-primary text-white px-4 py-2 rounded text-sm font-bold hover:bg-primary-dark transition-colors"
                    >
                      Buy it again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
