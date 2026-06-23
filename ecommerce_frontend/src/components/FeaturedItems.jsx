import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../api/axios";

// Import static images as fallbacks if the backend has missing images or drops connection
import shirtImg from "../assets/Image/interior/1.png";
import shortImg from "../assets/Image/interior/3.png";
import coatImg from "../assets/Image/interior/6.png";
import bagImg from "../assets/Image/tech/image 23.png";
import walletImg from "../assets/Image/interior/7.png";
import cameraImg from "../assets/Image/tech/image 29.png";
import headsetImg from "../assets/Image/tech/image 32.png";
import smartWatchImg from "../assets/Image/tech/8.png";
import cupImg from "../assets/Image/interior/9.png";
import blenderImg from "../assets/Image/interior/8.png";

const FeaturedItems = ({ navigateToDetail }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        const response = await api.get("products/featured/");

        // Maps incoming API properties dynamically to perfectly fit your existing UI rendering schema
        const serverItems = response.data.map((product, idx) => {
          // Local fallback tracking if backend items don't have enough asset files linked yet
          const fallbackArray = [
            shirtImg,
            shortImg,
            coatImg,
            bagImg,
            walletImg,
            cameraImg,
            headsetImg,
            smartWatchImg,
            cupImg,
            blenderImg,
          ];
          const localFallback = fallbackArray[idx % fallbackArray.length];

          return {
            id: product.id,
            price: product.price || "0.00",
            desc: product.name || product.description || "Featured Product",
            image: product.image?.startsWith("http")
              ? product.image
              : getImageUrl(product.image) || localFallback,
          };
        });

        setItems(serverItems);
      } catch (error) {
        console.error("Error fetching featured items:", error);

        // FALLBACK LOGIC: Fall back to your original list structure if backend drops or is offline
        setItems([
          { id: 1, price: "10.30", desc: "Featured T-shirts with multiple colors, for men", image: shirtImg },
          { id: 2, price: "10.30", desc: "Premium Jeans shorts for men blue color", image: shortImg },
          { id: 3, price: "12.50", desc: "Featured Brown winter coat medium size", image: coatImg },
          { id: 4, price: "34.00", desc: "Luxury Jeans bag for travel for men", image: bagImg },
          { id: 5, price: "99.00", desc: "Handcrafted Leather wallet", image: walletImg },
          { id: 6, price: "9.99", desc: "Canon camera 20x zoom, silver color", image: cameraImg },
          { id: 7, price: "8.99", desc: "Pro Headset for gaming with mic", image: headsetImg },
          { id: 8, price: "10.30", desc: "Smart watch silver edition", image: smartWatchImg },
          { id: 9, price: "10.30", desc: "Minimalist Blue wallet for men", image: cupImg },
          { id: 10, price: "80.00", desc: "Designer Leather bag for travel", image: blenderImg },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (loading) {
    return (
      <section className="mt-8">
        <h3 className="text-2xl font-bold mb-6">Featured items</h3>
        <div className="text-center py-12 text-[#8B96A5] font-medium">
          Loading featured highlights...
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-bold mb-6">Featured items</h3>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-white border border-[#DEE2E7] rounded-lg p-4 flex flex-col hover:shadow-[0px_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 cursor-pointer group h-full"
            onClick={() => navigateToDetail && item.id && navigateToDetail(item.id)}
          >
            <div className="flex-1 flex items-center justify-center p-4 mb-3">
              <img
                src={item.image}
                alt={item.desc}
                className="max-h-[140px] w-auto object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="mt-auto">
              <p className="font-medium text-[#1C1C1C] text-lg mb-1">
                {item.price}
              </p>
              <p className="text-[#8B96A5] text-[15px] overflow-hidden text-ellipsis line-clamp-2 leading-snug">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedItems;
