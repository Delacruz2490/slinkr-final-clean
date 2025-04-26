import React, { useState } from "react";

const MessageRewriter = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [rewrittenMessage, setRewrittenMessage] = useState("");

  const handleRewrite = async () => {
    if (!inputMessage.trim()) {
      setRewrittenMessage("Please enter a message to rewrite.");
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant who rewrites user messages to avoid spam detection." },
            { role: "user", content: inputMessage }
          ],
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        setRewrittenMessage(data.choices[0].message.content.trim());
      } else {
        setRewrittenMessage("Error: No valid response from AI.");
      }
    } catch (error) {
      console.error(error);
      setRewrittenMessage("Error rewriting the message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Message Rewriter</h1>
      <p className="mb-6 text-gray-400">Rewrite messages to avoid spam detection.</p>
      <textarea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Enter your message here..."
        className="w-full max-w-2xl h-40 p-4 mb-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        className="w-full max-w-2xl h-40 p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
      />
    </div>
  );
};

export default MessageRewriter;
