import React, { useState } from "react";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import { initialChatMessages } from "../../data/chatData.js";
import api from "../../services/aiApi.js";

function AIAssistant() {
  
  const [messages, setMessages] = useState(initialChatMessages);

const [isTyping, setIsTyping] = useState(false);

const [temperature, setTemperature] = useState(0);

const [topP, setTopP] = useState(1);
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const { data } = await api.post("/ai/chat", {
    message: text,
    temperature,
    top_p: topP,
});

      let replyText = data.reply;

      // Show returned data if available
      if (data.data) {

  replyText += "\n\n";

  if (Array.isArray(data.data)) {

    data.data.forEach((item, index) => {

      replyText += `${index + 1}. ${item.partNumber || "Part"}\n`;

    });

  } else {

    Object.entries(data.data).forEach(([key, value]) => {

      replyText += `${key}: ${JSON.stringify(value)}\n`;

    });

  }

}

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: replyText,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          err.response?.data?.message ||
          "Unable to connect to Aero MRO AI Assistant.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full xl:w-[30%] h-full glass-card rounded-xl flex flex-col overflow-hidden glow-blue-border border">
      <ChatHeader />
      <ChatMessages
    messages={messages}
    isTyping={isTyping}
/>

<div className="border-t p-4 space-y-3">

    <div>

        <label className="text-xs">
            Temperature (0–2): {temperature.toFixed(1)}
        </label>

        <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e)=>setTemperature(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
        />

    </div>

    <div>

        <label className="text-xs">
            Top-P (0–1): {topP.toFixed(2)}
        </label>

        <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={topP}
            onChange={(e)=>setTopP(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
        />

    </div>

    <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
    />

       </div>
    </div>
  );
}

export default AIAssistant;