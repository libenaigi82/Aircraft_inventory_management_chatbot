import React, { useState } from 'react';
import { Send } from 'lucide-react';

function ChatInput({ onSendMessage, disabled }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || disabled) return;
    
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 border-t border-white/[0.06] bg-white/[0.01] flex items-center gap-2"
    >
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          placeholder="Ask about inventory, stock prediction, aircraft compatibility..."
          className="w-full h-10 pl-4 pr-12 bg-[#1E293B]/60 border border-white/[0.08] rounded-xl text-xs text-[#F8FAFC] placeholder-[#F8FAFC]/30 focus:outline-none focus:border-[#3B82F6]/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className="absolute right-1.5 p-1.5 bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#1E293B] text-white disabled:text-[#F8FAFC]/20 rounded-lg transition-colors flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </form>
  );
}

export default ChatInput;