import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, Radio, Cpu } from 'lucide-react';

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayNum = date.getDate();
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${dayName}, ${monthName} ${dayNum}, ${year}, ${hours}:${minutes} ${ampm}`;
  };

  return (
    <header className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-2 border-b border-white/[0.06]">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[#3B82F6]">
            <Radio className="w-6 h-6 animate-pulse" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
            AeroMRO AI Command Center
          </h1>
        </div>
        <p className="text-sm text-[#F8FAFC]/60 mt-1 max-w-2xl">
          Real-time AI-powered aircraft inventory monitoring, predictive analytics and intelligent maintenance recommendations.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6 self-stretch lg:self-auto justify-between lg:justify-end">
        {/* Global Action Bar */}
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <span className="absolute inset-y-0 left-3 flex items-center text-[#F8FAFC]/40">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-16 bg-[#1E293B]/70 border border-white/[0.08] rounded-md text-sm text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:outline-none focus:border-[#3B82F6]/50 transition-colors"
            />
            <span className="absolute right-2 top-1.5 px-1.5 py-0.5 text-[10px] font-medium bg-[#EF4444]/20 text-[#EF4444] rounded border border--[#EF4444]/30">
              1 Alert
            </span>
          </div>

          <button className="relative p-2 bg-[#1E293B]/70 border border-white/[0.08] rounded-full text-[#F8FAFC]/80 hover:text-white hover:bg-[#1E293B] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>
        </div>

        {/* Profile & Live Status block */}
        <div className="flex items-center gap-4 border-l border-white/[0.08] pl-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Captain Alex Thompson"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[#3B82F6]/50"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-[#F8FAFC]">Captain Alex Thompson</div>
              <div className="text-xs text-[#F8FAFC]/40 flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-white/50">Live Data & Time:</span>
                <span className="text-white/70">{formatDateTime(currentTime)}</span>
              </div>
            </div>
          </div>

          {/* Infrastructure Health Badges */}
          <div className="flex flex-col text-[11px] gap-0.5 border-l border-white/[0.08] pl-4 font-mono">
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>System Online</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>API Connected</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#38BDF8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
              <span>AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;