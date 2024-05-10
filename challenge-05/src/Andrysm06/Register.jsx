import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MotionButton = motion.button;
const MotionInput = motion.input;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    try {
      setLoading(true);
      // Validasi password
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      // Lanjutkan dengan permintaan hanya jika password memenuhi persyaratan
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          name: username,
          password: password,
          email: email,
        }
      );
      if (response.status === 201) {
        setError("");
        setSuccessMessage(
          "Registration successful. Redirecting to login page..."
        );
        setTimeout(() => {
          window.location.href = "/Login-register";
        }, 2000); // Redirect after 2 seconds
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response.data.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <Navbar />
      <h2 className="mb-8 text-white text-xl font-bold">Register</h2>
      <>
        <MotionInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <MotionInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <MotionInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
        <MotionButton
          onClick={handleRegister}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-64 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none"
        >
          {loading ? "Loading..." : "Register"}
        </MotionButton>
        {error && (
          <p className="mt-4 text-red-500" whileHover={{ scale: 1.05 }}>
            {error}
          </p>
        )}
        {successMessage && (
          <p className="mt-4 text-green-500" whileHover={{ scale: 1.05 }}>
            {successMessage}
          </p>
        )}
        <Link
          to="/Login-register"
          className="text-white mt-2 hover:text-yellow-200"
          whileHover={{ scale: 1.05 }}
        >
          Already have an account? Login
        </Link>
      </>
    </motion.div>
  );
};

export default Register;
