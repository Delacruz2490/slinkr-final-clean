import React, { useState } from "react";

const MessageRewriter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRewrite = async () => {
    if (!input.trim()) {
      setOutput("Please enter a message.");
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
              content: "You are an assistant that rewrites promotional messages to sound natural and avoid spam detection.",
            },
            {
              role: "user",
              content: `Rewrite this promotional message to sound more natural and less spammy: "${input}"`,
            },
          ],
          temperature: 0.7,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setOutput(data.choices[0].message.content.trim());
      } else {
        setOutput("Error: No valid response from AI.");
      }
    } catch (error) {
      console.error("Rewrite error:", error);
      setOutput("Error contacting AI service.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-2">Message Rewriter</h1>
      <p className="mb-4 text-gray-400">Rewrite messages to avoid spam detection.</p>

      <textarea
        className="w-full max-w-2xl p-4 mb-4 rounded-lg text-black"
        rows={6}
        placeholder="Type your message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleRewrite}
        className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold mb-4"
      >
        Rewrite Message
      </button>

      <textarea
        className="w-full max-w-2xl p-4 rounded-lg text-black"
        rows={6}
        placeholder="Rewritten message appears here..."
        value={output}
        readOnly
      />
    </div>
  );
};

export default MessageRewriter;
