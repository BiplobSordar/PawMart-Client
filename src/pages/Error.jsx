import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../utils/usePageTitle";

const ErrorPage = ({ errorCode = 500, errorMessage = "Something went wrong" }) => {
  const navigate = useNavigate();
  usePageTitle(`${errorCode} | PawMart`);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-5">
      <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 text-red-600">{errorCode}</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{errorMessage}</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Please check the URL or try again later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-accent transition"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
