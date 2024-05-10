import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./Andrysm06/HomePage";
import MovieDetails from "./Andrysm06/MovieDetail";
import SearchMovies from "./Andrysm06/SearchMovies";
import Login from "./Andrysm06/Login";
import Profil from "./Andrysm06/Profil";
import Register from "./Andrysm06/Register";
import LoginWithGoogle from "./Andrysm06/LoginWithGoogle";
import PopularMovies from "./Andrysm06/PopularMovies";
import TrandingMovies from "./Andrysm06/TrandingMovies";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movie-details",
      element: <MovieDetails />,
    },
    {
      path: "/TopRatedMovies",
      element: <PopularMovies />,
    },
    {
      path: "/search-movie",
      element: <SearchMovies />,
    },
    {
      path: "/Login-register",
      element: <Login />,
    },
    {
      path: "/profil",
      element: <Profil />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/Google",
      element: <LoginWithGoogle />,
    },
    {
      path: "/TrandingMovies",
      element: <TrandingMovies />,
    },
  ]);

  return <RouterProvider router={router} />;
}
