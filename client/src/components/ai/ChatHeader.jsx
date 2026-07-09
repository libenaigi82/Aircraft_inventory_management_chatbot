import React from 'react';
import { Bot, Menu } from 'lucide-react';

function ChatHeader() {
  return (
    <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
          <Bot className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs font-semibold tracking-wide text-[#F8FAFC]">
            AI Inventory Assistant
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-[#10B981] font-medium mt-0.5">
            <span className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse" />
            <span>System Agent Active</span>
          </div>
        </div>
      </div>
      <button className="p-1.5 rounded-md hover:bg-white/[0.05] text-[#F8FAFC]/40 hover:text-white transition-colors">
        <Menu className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ChatHeader;