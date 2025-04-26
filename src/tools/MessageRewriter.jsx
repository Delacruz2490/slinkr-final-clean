import React, { useState } from "react";

const MessageRewriter = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRewrite = async () => {
    if (!inputMessage.trim()) {
      setRewrittenMessage("Please enter a message to rewrite.");
      return;
    }

    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Rewrite the user's message in a way that avoids spam detection but keeps the meaning." },
            { role: "user", content: inputMessage },
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (data && data.choices && data.choices.length > 0) {
        setRewrittenMessage(data.choices[0].message.content.trim());
      } else {
        setRewrittenMessage("Error: No response from AI.");
      }
    } catch (error) {
      console.error(error);
      setRewrittenMessage("Error rewriting the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2 text-white">Message Rewriter</h1>
      <p className="text-gray-400 mb-6">Rewrite messages to avoid spam detection.</p>

      <textarea
        className="w-full p-4 rounded-lg mb-4 bg-white text-black resize-none"
        rows="6"
        placeholder="Type your original message here..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />

      <button
        onClick={handleRewrite}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition disabled:opacity-50"
      >
        {loading ? "Rewriting..." : "Rewrite Message"}
      </button>

      <textarea
        className="w-full p-4 rounded-lg mt-6 bg-white text-black resize-none"
        rows="6"
        placeholder="Your rewritten message will appear here..."
        value={rewrittenMessage}
        readOnly
      />
    </div>
  );
};

export default MessageRewriter;
