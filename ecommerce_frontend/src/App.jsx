import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Deals from "./components/Deals";
import CategorySection from "./components/CategorySection";
import InquiryForm from "./components/InquiryForm";
import FeaturedItems from "./components/FeaturedItems";
import Services from "./components/Services";
import RegionSuppliers from "./components/RegionSuppliers";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Register from "./components/Register";
import api from "./api/axios";

import homeBanner from "./assets/Image/backgrounds/image 98.png";
import electronicsBanner from "./assets/Image/backgrounds/image 106.png";

import itemH1 from "./assets/Image/interior/1.png";
import itemH2 from "./assets/Image/interior/3.png";
import itemH3 from "./assets/Image/interior/6.png";
import itemH4 from "./assets/Image/interior/7.png";
import itemH5 from "./assets/Image/interior/8.png";
import itemH6 from "./assets/Image/interior/9.png";
import itemH7 from "./assets/Image/interior/image 89.png";
import itemH8 from "./assets/Image/interior/image 93.png";

import itemE1 from "./assets/Image/tech/8.png";
import itemE2 from "./assets/Image/tech/image 85.png";
import itemE3 from "./assets/Image/tech/image 32.png";
import itemE4 from "./assets/Image/tech/image 33.png";
import itemE5 from "./assets/Image/tech/image 34.png";
import itemE6 from "./assets/Image/tech/image 23.png";
import itemE7 from "./assets/Image/tech/image 86.png";
import itemE8 from "./assets/Image/tech/6.png";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});

  const wantedCategoryKeywords = ["computer"];

  const fallbackCategories = [
    { id: 2, name: "Computer accessories" },
  ];

  const fallbackCategoryProducts = {
    2: [
      { id: 201, name: "Smart watches", price: "19", image: itemE1 },
      { id: 202, name: "Cameras", price: "89", image: itemE2 },
      { id: 203, name: "Headphones", price: "10", image: itemE3 },
      { id: 204, name: "Smartphones", price: "19", image: itemE4 },
      { id: 205, name: "Gaming set", price: "35", image: itemE5 },
      { id: 206, name: "Laptop & PC", price: "340", image: itemE6 },
      { id: 207, name: "Smartphones", price: "19", image: itemE7 },
      { id: 208, name: "Electric kettle", price: "240", image: itemE8 },
    ],
  };

  const bannerConfigs = [
    { bg: "#FFE6BF", img: homeBanner },
    { bg: "#E5F1FF", img: electronicsBanner },
    { bg: "#E3F0FF", img: homeBanner },
    { bg: "#FFF0DF", img: electronicsBanner },
  ];

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const catRes = await api.get("products/category/");
        const cats = catRes.data.results || catRes.data;
        if (!cats || cats.length === 0) throw new Error("No categories");

        const filtered = cats.filter((cat) =>
          wantedCategoryKeywords.some((kw) =>
            cat.name.toLowerCase().includes(kw)
          )
        );
        if (filtered.length === 0) throw new Error("No matching categories");
        setCategories(filtered);

        const productsMap = {};
        await Promise.all(
          filtered.map(async (cat) => {
            try {
              const prodRes = await api.get("products/products/", {
                params: { category: cat.id },
              });
              productsMap[cat.id] = (prodRes.data.results || prodRes.data).slice(0, 8);
            } catch {
              productsMap[cat.id] = [];
            }
          })
        );
        setCategoryProducts(productsMap);
      } catch (error) {
        console.error("Failed to fetch categories, using fallback:", error);
        setCategories(fallbackCategories);
        setCategoryProducts(fallbackCategoryProducts);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const navigateToDetail = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage("details");
  };

  const navigateToListing = (query) => {
    setSearchQuery(query || "");
    setCurrentPage("listing");
  };

  const renderContent = () => {
    switch (currentPage) {
      case "listing":
        return <ProductListing setPage={setCurrentPage} navigateToDetail={navigateToDetail} searchQuery={searchQuery} />;
      case "details":
        return <ProductDetails setPage={setCurrentPage} productId={selectedProductId} />;
      case "cart":
        return <Cart setPage={setCurrentPage} />;
      case "profile":
        return <Profile setPage={setCurrentPage} />;
      case "message":
        return <Messages setPage={setCurrentPage} />;
      case "orders":
        return <Orders setPage={setCurrentPage} />;
      case "login":
        return <Login setPage={setCurrentPage} />;
      case "register":
        return <Register setPage={setCurrentPage} />;
      case "home":
      default:
        return (
          <div className="container">
            <Hero setPage={setCurrentPage} />
            <Deals setPage={setCurrentPage} navigateToDetail={navigateToDetail} />

            {categories.map((cat, index) => {
              const config = bannerConfigs[index % bannerConfigs.length];
              return (
                <CategorySection
                  key={cat.id}
                  title={cat.name}
                  bannerBg={config.bg}
                  bannerImg={config.img}
                  items={categoryProducts[cat.id] || []}
                  navigateToDetail={navigateToDetail}
                />
              );
            })}

            <InquiryForm />
            <FeaturedItems setPage={setCurrentPage} navigateToDetail={navigateToDetail} />
            <Services />
            <RegionSuppliers />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPage={setCurrentPage} onSearch={navigateToListing} />
      <main className="flex-grow pb-12">{renderContent()}</main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
