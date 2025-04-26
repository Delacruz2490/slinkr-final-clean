import React, { useState } from "react";

const MessageRewriter = () => {
  const [originalMessage, setOriginalMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!originalMessage.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: originalMessage }),
      });

      const data = await response.json();
      if (data.rewrittenText) {
        setRewrittenMessage(data.rewrittenText);
      } else {
        setRewrittenMessage("Failed to rewrite. Try again.");
      }
    } catch (error) {
      console.error("Rewrite failed", error);
      setRewrittenMessage("Error rewriting the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-4">Message Rewriter</h1>
      <p className="text-gray-400 mb-6">Rewrite messages to avoid spam detection.</p>

      <textarea
        className="w-full max-w-xl p-4 mb-4 bg-white text-gray-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        rows="6"
        placeholder="Type your original message here..."
        value={originalMessage}
        onChange={(e) => setOriginalMessage(e.target.value)}
      />

      <button
        onClick={handleRewrite}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Rewriting..." : "Rewrite Message"}
      </button>

      <textarea
        className="w-full max-w-xl p-4 mt-6 bg-white text-gray-800 rounded-lg resize-none focus:outline-none"
        rows="6"
        placeholder="Rewritten message will appear here..."
        value={rewrittenMessage}
        readOnly
      />
    </div>
  );
};

export default MessageRewriter;
