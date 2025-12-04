import React from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../utils/usePageTitle";

const GoBackPage = () => {
  usePageTitle("Go Back | PawMart");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-5">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-primary">
        Oops!
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
        You seem lost!
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Click the button below to go back to the previous page you were on.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-accent transition font-semibold text-lg"
      >
        Go Back
      </button>
       <button
        onClick={() => navigate('/')}
        className="bg-primary mt-5 text-white px-6 py-3 rounded-lg shadow-md hover:bg-accent transition font-semibold text-lg"
      >
        Go To Home Page
      </button>
    </div>
  );
};

export default GoBackPage;
