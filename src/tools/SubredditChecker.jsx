import React, { useState } from "react";

const SubredditChecker = () => {
  const [subreddit, setSubreddit] = useState("");
  const [status, setStatus] = useState("");

  const checkSubreddit = () => {
    // Simple dummy check - real version would call Reddit API
    if (subreddit.toLowerCase().includes("nsfw")) {
      setStatus("⚠️ Warning: NSFW detected! Be careful.");
    } else if (subreddit.toLowerCase().includes("banned")) {
      setStatus("🚫 This subreddit is known for banning promos.");
    } else {
      setStatus("✅ Looks good! Safe to post.");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🛡️ Subreddit Safety Checker</h2>

      <input
        type="text"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
        placeholder="Enter subreddit name..."
        className="w-full p-2 bg-gray-700 rounded mb-3"
      />
      <button
        onClick={checkSubreddit}
        className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
      >
        Check
      </button>

      {status && (
        <div className="mt-4 bg-gray-700 p-3 rounded">
          <p className="font-medium">{status}</p>
        </div>
      )}
    </div>
  );
};

export default SubredditChecker;
