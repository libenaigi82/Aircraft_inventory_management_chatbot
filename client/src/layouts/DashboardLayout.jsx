import React from 'react';

function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-full bg-[#0F172A] p-5 flex flex-col overflow-hidden selection:bg-[#3B82F6]/30 selection:text-white">
      <div className="w-full max-w-[1920px] mx-auto flex flex-col h-full gap-4 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;