import React, { useState } from "react";

const KarmaFarmer = () => {
  const [postList, setPostList] = useState([]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPostList([...postList, newPost]);
      setNewPost("");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📈 Karma Farmer</h2>

      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write a witty Reddit comment..."
        className="w-full p-2 bg-gray-700 rounded mb-3"
      />

      <button
        onClick={addPost}
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
      >
        Add Comment
      </button>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Your Karma Farming Comments:</h3>
        <ul className="list-disc list-inside space-y-2">
          {postList.map((post, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded">{post}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KarmaFarmer;
