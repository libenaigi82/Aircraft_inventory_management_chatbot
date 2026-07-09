import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { stockDistributionData } from '../../data/dashboardData.js';

function StockDistributionChart() {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-col h-[326px] w-full">
      <h3 className="text-sm font-semibold text-[#F8FAFC]/80 mb-2 tracking-wide">
        Stock Distribution Donut Chart
      </h3>
      
      <div className="flex-1 w-full flex items-center justify-between gap-2">
        {/* Left Hand: Guaranteed Square Aspect Bounds */}
        <div className="w-[50%] h-[200px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stockDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {stockDistributionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="rgba(15, 23, 42, 0.9)" 
                    strokeWidth={2} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right Hand: Clean Micro Legend Alignment */}
        <div className="w-[48%] flex flex-col gap-3 justify-center pr-1">
          {stockDistributionData.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <span 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] text-[#F8FAFC]/80 font-medium tracking-wide truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockDistributionChart;