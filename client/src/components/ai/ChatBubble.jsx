import React from 'react';
import { Bot, User } from 'lucide-react';

function ChatBubble({ message }) {
  const isAi = message.sender === 'ai';

  const parseBold = (text) => {
    const parts = text.split(/\*\*(.*?)\*\//g);
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-white">{part}</strong> : part);
  };

  const renderFormattedText = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.trim().startsWith('* ')) {
        const cleanText = line.replace('* ', '');
        return (
          <div key={index} className="flex items-start gap-2 my-1 ml-1 text-[#F8FAFC]/90">
            <span className="text-[#3B82F6] mt-1.5 shrink-0 text-[6px]">●</span>
            <span className="leading-relaxed">{parseBold(cleanText)}</span>
          </div>
        );
      }
      return (
        <p key={index} className="my-1.5 leading-relaxed text-[#F8FAFC]/90 break-words">
          {parseBold(line)}
        </p>
      );
    });
  };

  return (
    <div className={`flex w-full gap-3 ${isAi ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}>
      {isAi && (
        <div className="w-7 h-7 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
          <Bot className="w-4 h-4" />
        </div>
      )}
      
      <div className={`max-w-[85%] rounded-xl p-3.5 text-xs ${
        isAi 
          ? 'bg-white/[0.03] border border-white/[0.04] text-[#F8FAFC]' 
          : 'bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#F8FAFC] font-medium'
      }`}>
        {renderFormattedText(message.text)}
      </div>

      {!isAi && (
        <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[#F8FAFC]/80 shrink-0 mt-0.5">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

export default ChatBubble;