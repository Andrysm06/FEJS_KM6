import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getCurrentAuthUser = async () => {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;
        if (response.status === 200) {
          setUserData(data);
        }
        console.log("authorize", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCurrentAuthUser();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 text-white min-h-screen"
    >
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          {userData ? (
            <div className="flex items-center">
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-lg font-semibold">Name: {userData.name}</p>
                <p className="text-lg">Email: {userData.email}</p>
                {/* Add other profile information here */}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;
