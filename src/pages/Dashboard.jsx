import React from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/config";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Slinkr Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="mb-8">Welcome, {currentUser?.email || "User"}!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ToolCard title="Message Rewriter" path="/message-rewriter" />
        <ToolCard title="Stealth Post Tool" path="/stealth-post" />
        <ToolCard title="Karma Farmer" path="/karma-farmer" />
        <ToolCard title="Inbox Manager" path="/inbox-manager" />
        <ToolCard title="Subreddit Checker" path="/subreddit-checker" />
      </div>
    </div>
  );
};

const ToolCard = ({ title, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-gray-800 p-5 rounded-lg shadow hover:bg-purple-600 transition cursor-pointer"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default Dashboard;
