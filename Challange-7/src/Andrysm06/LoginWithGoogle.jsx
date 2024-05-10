import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { motion } from "framer-motion";

const MotionButton = motion.button;

const LoginWithGoogle = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const responseGoogle = async (response) => {
    try {
      const token = response.access_token;
      const res = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
        {
          token,
        }
      );
      const data = res.data;
      localStorage.setItem("token", data.access_token);

      const headers = {
        Authorization: `Bearer ${data.access_token}`,
      };
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Login success:", codeResponse);
      try {
        const response = await axios.post(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
          {
            access_token: `${codeResponse?.access_token}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("token", response.data.data.token);
        console.log("data", response.data);
        setIsLoggedIn(true);
        // Redirect or navigate to another page
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      // Handle error
    },
  });

  return (
    <>
      <MotionButton
        onClick={login}
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative border max-w-[200px] text-white border-gray-300 py-1 w-full text-center rounded-md font-medium"
      >
        Google
        <svg
          className="absolute top-1/2 -translate-y-1/2 left-2"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
          <path d="M1 1h22v22H1z" fill="none" />
        </svg>
      </MotionButton>
      {isLoggedIn && <p className="text-green-500">Login successful!</p>}
      {isLoggedIn && (
        <a
          href="/"
          className="text-white hover:text-yellow-200 transition-colors duration-300"
        >
          Back To Home
        </a>
      )}
    </>
  );
};

export default LoginWithGoogle;
