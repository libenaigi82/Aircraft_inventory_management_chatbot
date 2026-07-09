import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import Header from '../components/layout/Header.jsx';
import KPISection from '../components/dashboard/KPISection.jsx';
import ChartsSection from '../components/dashboard/ChartsSection.jsx';
import AIInsights from '../components/dashboard/AIInsights.jsx';
import InventoryTable from '../components/dashboard/InventoryTable.jsx';
import AIAssistant from '../components/ai/AIAssistant.jsx';

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Top Fixed Control Section */}
      <div className="flex flex-col gap-4 shrink-0">
        <Header />
        <KPISection />
      </div>

      {/* Main Bottom Section: Balanced Screen Workspace */}
      <div className="w-full flex-1 min-h-0 flex flex-col xl:flex-row gap-5 items-stretch overflow-hidden">
        {/* Left Operational Analytics Stack (Scrollable Window) */}
        <div className="w-full xl:w-[70%] h-full flex flex-col gap-4 overflow-y-auto pr-1">
          <ChartsSection />
          <AIInsights />
          <InventoryTable />
        </div>

        {/* Right Docked AI Copilot (Always fully visible, internal scroll only) */}
        <AIAssistant />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;