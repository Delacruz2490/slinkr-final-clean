import React, { useState } from "react";

const MessageRewriter = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");

  const handleRewrite = async () => {
    if (!inputMessage) {
      setRewrittenMessage("Please enter a message to rewrite.");
      return;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that rewrites user messages to avoid spam detection while keeping the meaning the same.",
            },
            {
              role: "user",
              content: inputMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        setRewrittenMessage(data.choices[0].message.content.trim());
      } else {
        setRewrittenMessage("Error: No valid response from AI.");
      }
    } catch (error) {
      console.error("Error rewriting message:", error);
      setRewrittenMessage("Error contacting the AI service.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Message Rewriter</h1>
      <p className="text-gray-400 mb-6">Rewrite messages to avoid spam detection.</p>

      <textarea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Enter your message here..."
        className="w-full max-w-2xl h-40 p-3 mb-4 rounded-lg bg-gray-800 text-white resize-none"
      />

      <button
        onClick={handleRewrite}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full mb-6"
      >
        Rewrite Message
      </button>

      <textarea
        value={rewrittenMessage}
        readOnly
        placeholder="Rewritten message will appear here..."
        className="w-full max-w-2xl h-40 p-3 rounded-lg bg-gray-800 text-white resize-none"
      />
    </div>
  );
};

export default MessageRewriter;
