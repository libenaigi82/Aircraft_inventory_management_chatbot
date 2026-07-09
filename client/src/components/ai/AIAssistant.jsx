import React, { useState } from "react";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import { initialChatMessages } from "../../data/chatData.js";
import api from "../../services/aiApi.js";

function AIAssistant() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [isTyping, setIsTyping] = useState(false);

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
      });

      let replyText = data.reply;

      // Show returned data if available
      if (Array.isArray(data.data) && data.data.length > 0) {
        replyText += "\n\n";

        data.data.forEach((item, index) => {
          replyText += `${index + 1}. ${
            item.partNumber || item.part_number || "Part"
          }`;

          if (item.partName || item.name)
            replyText += ` - ${item.partName || item.name}`;

          if (item.quantity !== undefined)
            replyText += ` (Qty: ${item.quantity})`;

          replyText += "\n";
        });
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
      <ChatMessages messages={messages} isTyping={isTyping} />
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
}

export default AIAssistant;