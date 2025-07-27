import React, { useState } from "react";
import { Send, X, Bot, User } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi, I'm Docs.ai Assistant! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const replies = [
        "Sure, I can help with that!",
        "Let me guide you.",
        "Can you clarify your question?",
        "That's a good question. Here's a tip...",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <div className="w-72 h-96 bg-white border border-gray-300 rounded-md flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-gray-100 px-3 py-2 border-b">
            <span className="text-sm font-semibold">Docs.ai Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-md ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-xs text-gray-500">Typing...</div>
            )}
          </div>

          {/* Input Box */}
          <div className="flex items-center border-t px-3 py-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-1 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-gray-600 hover:text-black"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

{/* Awesome-Looking Toggle Button */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
  title="Docs.ai Assistant"
>
  {isOpen ? (
    <X className="w-5 h-5" />
  ) : (
    <div className="relative">
      <Bot className="w-6 h-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
        !
      </span>
    </div>
  )}
</button>


    </div>
  );
};

export default ChatBot;
