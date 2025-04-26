import React, { useState } from "react";

const StealthPostTool = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const generateStealthPost = () => {
    // Simple stealth randomizer logic
    const endings = ["🔥", "💎", "✨", "✅", "👉", "💖"];
    const randomEnding = endings[Math.floor(Math.random() * endings.length)];
    setPostTitle(postTitle + " " + randomEnding);
    setPostBody(postBody + " " + randomEnding);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🥷 Stealth Post Generator</h2>

      <input
        type="text"
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        placeholder="Enter Post Title"
        className="w-full p-2 bg-gray-700 rounded mb-3"
      />
      <textarea
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
        placeholder="Enter Post Body"
        rows="4"
        className="w-full p-2 bg-gray-700 rounded mb-3"
      />

      <button
        onClick={generateStealthPost}
        className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-500"
      >
        Make Stealth Post
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Preview:</h3>
        <p className="mb-2"><strong>Title:</strong> {postTitle}</p>
        <p><strong>Body:</strong> {postBody}</p>
      </div>
    </div>
  );
};

export default StealthPostTool;
