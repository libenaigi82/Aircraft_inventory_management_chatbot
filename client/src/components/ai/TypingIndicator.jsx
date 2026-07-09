import React from 'react';
import { Bot } from 'lucide-react';

function TypingIndicator() {
  return (
    <div className="flex w-full gap-3 justify-start mb-4 animate-fadeIn">
      <div className="w-7 h-7 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
        <Bot className="w-4 h-4" />
      </div>
      
      <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3.5 flex items-center justify-center gap-1.5 w-16">
        <span className="w-1.5 h-1.5 bg-[#F8FAFC]/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-[#F8FAFC]/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-[#F8FAFC]/40 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

export default TypingIndicator;