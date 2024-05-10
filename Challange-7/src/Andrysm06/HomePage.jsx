import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/actions/homePageActions";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error, totalPages } = useSelector(
    (state) => state.movie
  );

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (totalPages > 0 && currentPage <= totalPages) {
      dispatch(fetchData(currentPage));
    }
  }, [dispatch, currentPage, totalPages]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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
        <div className="flex justify-center items-center h-12">
          <a
            href="/TrandingMovies"
            className="bg-yellow-400 rounded-full px-8 py-1 text-white font-semibold hover:bg-yellow-200/40"
          >
            View More
          </a>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default HomePage;
