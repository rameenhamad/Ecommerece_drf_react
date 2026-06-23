import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../api/axios";

import watchImg from "../assets/Image/tech/8.png";
import laptopImg from "../assets/Image/tech/image 23.png";
import goproImg from "../assets/Image/tech/image 29.png";
import headphonesImg from "../assets/Image/tech/image 32.png";
import phoneImg from "../assets/Image/tech/image 33.png";

const fallbackDeals = [
  { id: 1, name: "Smart watches", price: "19.99", image: watchImg },
  { id: 2, name: "Laptops", price: "499.00", image: laptopImg },
  { id: 3, name: "GoPro cameras", price: "299.00", image: goproImg },
  { id: 4, name: "Headphones", price: "49.99", image: headphonesImg },
  { id: 5, name: "Smartphones", price: "699.00", image: phoneImg },
];

const Deals = ({ setPage, navigateToDetail }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get("products/featured/");
        const data = Array.isArray(response.data) ? response.data : response.data.results || [];
        if (data.length > 0) {
          setDeals(data);
        } else {
          setDeals(fallbackDeals);
        }
      } catch (error) {
        console.error("Error loading deals from backend:", error);
        setDeals(fallbackDeals);
      }
    };
    fetchDeals();
  }, []);

  return (
    <section className="bg-white border border-[#DEE2E7] rounded-lg mt-6 flex overflow-hidden">
      <div className="w-72 p-6 border-r border-[#DEE2E7] flex flex-col justify-center">
        <h3 className="text-xl font-bold text-dark mb-1">Deals and offers</h3>
        <p className="text-secondary mb-4 font-normal">Hygiene equipments</p>
        <div className="flex gap-2">
          {["04", "13", "34", "56"].map((time, i) => (
            <div
              key={i}
              className="w-12 h-12 bg-[#606060] rounded flex flex-col items-center justify-center text-white"
            >
              <span className="text-sm font-bold">{time}</span>
              <span className="text-[10px] opacity-70">
                {i === 0 ? "Days" : i === 1 ? "Hour" : i === 2 ? "Min" : "Sec"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-full">
        {deals.map((deal, index) => {
          const imageUrl = getImageUrl(deal.image) || deal.image;
          return (
            <div
              key={deal.id || index}
              className="p-6 flex flex-col items-center justify-center text-center border-r border-b lg:border-b-0 last:border-r-0 border-[#DEE2E7] cursor-pointer hover:shadow-[0px_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
              onClick={() => navigateToDetail ? navigateToDetail(deal.id) : setPage("details")}
            >
              <div className="w-full aspect-square bg-[#F7F7F7] rounded-md flex items-center justify-center mb-4 overflow-hidden p-2">
                <img
                  src={imageUrl}
                  alt={deal.name}
                  className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-[#1C1C1C] text-sm mb-1">{deal.name}</p>
              {deal.price && (
                <p className="text-primary font-bold text-sm mb-2">{deal.price}</p>
              )}
              <span className="bg-[#FFE3E3] text-[#EB001B] px-3 py-1 rounded-full text-xs font-bold">
                {deal.discount || "Featured"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Deals;
