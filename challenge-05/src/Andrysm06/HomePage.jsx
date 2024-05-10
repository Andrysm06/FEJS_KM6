import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "86805d3f5cae4725244fe5e0f2c0bc28";
const token = localStorage.getItem("token");
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating / 2) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="text-gray-400">
          ★
        </span>
      );
    }
  }
  return (
    <div className="flex items-center absolute top-0 left-0 ml-2 mt-2">
      {stars}
    </div>
  );
};

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    setLoading(false);
  }, []);

  async function getCurrentAuthUser() {
    try {
      const response = await fetch(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
        {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      }
      console.log("authorize", data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
        { headers: { accept: "application/json" } }
      );
      setData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getCurrentAuthUser();
  }, []);

  useEffect(() => {
    getMovies();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 text-white min-h-screen"
    >
      <Navbar />

      <div className="relative h-[240px] md:h-[400px] lg:h-[428px]">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <img
            src="/int.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/75 flex items-center">
            <div className="text-center px-10 md:px-20 lg:px-40">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                Welcome to
              </h1>
              <div className="flex items-center mb-8">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-yellow-200 text-4xl mr-2"
                />
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold">
                  W Movies
                </h1>
              </div>
              <a
                href="#movie"
                className="bg-yellow-400 rounded-full px-12 py-3 text-white font-semibold hover:bg-yellow-200/40"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        id="movie"
        className="container mx-auto py-12 relative"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
          Trending Now
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(data) ? (
            data.map((e) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col relative"
                onClick={() => {
                  navigate("/movie-details", { state: { id: e.id } });
                }}
              >
                <img
                  className="w-full h-[300px] object-cover mb-2"
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  alt={e.title}
                />
                <p className="text-sm md:text-base font-semibold line-clamp-2">
                  {e.title}
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center mt-1"
                >
                  <div className="w-4 mr-1">
                    <StarRating rating={e.vote_average} />
                  </div>
                  <p className="text-sm font-semibold">{e.release_date}</p>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p>Data is not available or is not in the expected format.</p>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "bg-gray-700" : "bg-yellow-400"
            } px-4 py-2 rounded-full mr-2`}
          >
            Prev
          </button>
          {[...Array(totalPages > 8 ? 8 : totalPages).keys()].map((num) => {
            const pageNumber =
              currentPage > 5 ? currentPage + num - 4 : num + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`${
                  currentPage === pageNumber ? "bg-yellow-400" : "bg-gray-700"
                } px-4 py-2 rounded-full mr-2`}
              >
                {pageNumber}
              </button>
            );
          })}
          {totalPages > 8 && (
            <button
              onClick={() => setCurrentPage(currentPage + 8)}
              className="bg-gray-700 px-4 py-2 rounded-full"
            >
              ...
            </button>
          )}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? "bg-gray-700" : "bg-yellow-400"
            } px-4 py-2 rounded-full ml-2`}
          >
            Next
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default HomePage;
