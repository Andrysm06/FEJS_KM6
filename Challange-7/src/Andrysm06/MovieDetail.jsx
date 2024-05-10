import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";

function MovieDetail() {
  let location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchMovieDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Terjadi kesalahan saat mengambil data.");
    }
  };

  useEffect(() => {
    fetchMovieDetail();
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <section>
        {error ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div>
            {!isLoggedIn ? (
              <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <p className="text-lg mb-4">
                  You must first log in to view movie details.
                </p>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="/Login-register"
                >
                  Login
                </motion.a>
                <Link
                  to="/"
                  className=" mt-1 px-2 py-2 text-yellow-400 hover:text-yellow-200 mr-4"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <div
                className="relative h-screen md:h-[600px] lg:h-[700px]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data?.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">{data?.title}</h1>
                  <h2 className="text-xl font-semibold">Rating:</h2>
                  <p className="text-lg font-normal text-white ps-4">
                    {data?.vote_average}
                  </p>
                  <div className="flex justify-center items-center mb-4"></div>
                  <p className="text-lg mb-8">{data?.overview}</p>
                  <h2 className="text-xl font-semibold">Negara Asal:</h2>
                  <ul className="text-lg font-normal text-white ps-4">
                    {data?.production_countries &&
                      data?.production_countries.map((country) => (
                        <li key={country.iso_3166_1}>{country.name}</li>
                      ))}
                  </ul>

                  <Link
                    to="/"
                    className="inline-block mt-4 bg-yellow-400 rounded-full px-12 py-3 text-white font-semibold hover:bg-yellow-200"
                  >
                    Back
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default MovieDetail;
