import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import MessageRewriter from "./tools/MessageRewriter";
import StealthPostTool from "./tools/StealthPostTool";
import KarmaFarmer from "./tools/KarmaFarmer";
import InboxManager from "./tools/InboxManager";
import SubredditChecker from "./tools/SubredditChecker";

import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/message-rewriter" element={<MessageRewriter />} />
          <Route path="/stealth-post" element={<StealthPostTool />} />
          <Route path="/karma-farmer" element={<KarmaFarmer />} />
          <Route path="/inbox-manager" element={<InboxManager />} />
          <Route path="/subreddit-checker" element={<SubredditChecker />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
