import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <button
        onClick={handleGetStarted}
        className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg hover:bg-purple-700 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
