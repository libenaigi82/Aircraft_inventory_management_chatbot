import React from 'react';
import InventoryTrendChart from './InventoryTrendChart.jsx';
import StockDistributionChart from './StockDistributionChart.jsx';
import WarehouseCapacityChart from './WarehouseCapacityChart.jsx';
import InventoryMovementChart from './InventoryMovementChart.jsx';

function ChartsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 w-full shrink-0">
      {/* Left: Expanded Inventory Trend Line Chart */}
      <div className="xl:col-span-5 flex w-full">
        <InventoryTrendChart />
      </div>

      {/* Center: Recalibrated balanced column for Donut layout */}
      <div className="xl:col-span-4 flex w-full">
        <StockDistributionChart />
      </div>

      {/* Right: Dual Bar Charts scaled slightly down dynamically */}
      <div className="xl:col-span-3 flex flex-col gap-4 w-full justify-between">
        <WarehouseCapacityChart />
        <InventoryMovementChart />
      </div>
    </div>
  );
}

export default ChartsSection;