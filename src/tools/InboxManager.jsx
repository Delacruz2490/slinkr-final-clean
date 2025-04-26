import React, { useState } from "react";

const InboxManager = () => {
  const [messages, setMessages] = useState([
    { sender: "RedditUser123", content: "Hey there! 😊" },
    { sender: "AnotherUser", content: "Love your posts! 🔥" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { sender: "You", content: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📥 Inbox Manager</h2>

      <div className="bg-gray-700 p-3 rounded mb-4 h-48 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span className="font-semibold">{msg.sender}:</span> {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a reply..."
        className="w-full p-2 bg-gray-700 rounded mb-3"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
      >
        Send
      </button>
    </div>
  );
};

export default InboxManager;
