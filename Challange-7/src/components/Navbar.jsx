import React, { useState, useEffect } from "react";
import { Search } from "react-feather";

function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false); // State untuk konfirmasi logout
  const token = localStorage.getItem("token");

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      setIsHidden(isScrollingDown);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setConfirmLogout(true); // Menampilkan modal konfirmasi logout
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    setConfirmLogout(false); // Sembunyikan modal konfirmasi logout
  };

  const handleCancelLogout = () => {
    setConfirmLogout(false); // Sembunyikan modal konfirmasi logout
  };

  return (
    <nav
      className={`py-4 px-3 fixed top-0 w-full z-10 bg-navy transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container flex justify-between items-center">
        <a href="/" className="text-yellow-400 text-2xl font-bold">
          WMovies
        </a>
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/TopRatedMovies"
            className="text-white hover:text-yellow-200 transition-colors duration-300"
          >
            Top Movies
          </a>
          <a
            href="/search-movie"
            className="text-white hover:text-yellow-200 transition-colors duration-300"
          >
            🔍Search
          </a>
          {token ? (
            <div>
              <button
                onClick={handleLogout} // Menggunakan handleLogout untuk menampilkan modal konfirmasi
                className="bg-red-900 rounded-full px-3 py-1 text-white hover:bg-yellow-200/40"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/Login-register"
              className="text-white hover:text-yellow-200 transition-colors duration-300"
            >
              Login
            </a>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <Search className="h-6 w-6 text-white" />
        </div>
      </div>
      {/* Modal Konfirmasi Logout */}
      {confirmLogout && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center">
              <button
                onClick={handleConfirmLogout} // Menggunakan handleConfirmLogout untuk logout
                className="bg-red-900 rounded-full px-3 py-1 text-white mr-2 hover:bg-yellow-200/40"
              >
                Yes
              </button>
              <button
                onClick={handleCancelLogout} // Menggunakan handleCancelLogout untuk membatalkan logout
                className="bg-gray-300 rounded-full px-3 py-1 text-gray-700 hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
