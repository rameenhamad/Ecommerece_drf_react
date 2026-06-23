import React, { useState, useEffect } from "react";
import api from "../api/axios";

const Profile = ({ setPage }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get("user/profile/");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
        setUserData({
          username: "User",
          email: "user@example.com",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setPage("home");
  };

  if (loading) {
    return (
      <div className="container py-24 text-center font-medium text-[#8B96A5]">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="bg-white border border-[#DEE2E7] rounded-lg p-8 shadow-sm max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#DEE2E7]">
          <div className="w-24 h-24 rounded-full bg-[#E3F0FF] flex items-center justify-center text-primary text-3xl font-bold">
            {getInitials(userData?.username || userData?.name)}
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {userData?.username || userData?.name || "User"}
            </h2>
            <p className="text-[#505050]">
              {userData?.email || "user@example.com"}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg hover:bg-shade transition-colors flex justify-between items-center">
            <span>Edit Profile</span>
            <span className="text-[#8B96A5]">→</span>
          </button>
          <button className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg hover:bg-shade transition-colors flex justify-between items-center">
            <span>Shipping Address</span>
            <span className="text-[#8B96A5]">→</span>
          </button>
          <button className="w-full text-left p-4 border border-[#DEE2E7] rounded-lg hover:bg-shade transition-colors flex justify-between items-center">
            <span>Payment Methods</span>
            <span className="text-[#8B96A5]">→</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex justify-between items-center text-red-600"
          >
            <span>Logout</span>
            <span className="text-red-400">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
