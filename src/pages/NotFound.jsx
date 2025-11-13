import React from "react";
import { Link } from "react-router-dom";
import usePageTitle from '../utils/usePageTitle'

const NotFound = () => {
  usePageTitle("Not Fount | PawMart");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-5">
      <h1 className="text-6xl sm:text-7xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-primary dark:bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-accent dark:hover:bg-accent transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
