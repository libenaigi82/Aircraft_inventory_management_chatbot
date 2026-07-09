import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { inventoryMovementData } from '../../data/dashboardData.js';

function InventoryMovementChart() {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-col h-[155px] w-full">
      <h3 className="text-sm font-semibold text-[#F8FAFC]/80 mb-2 tracking-wide">
        Monthly Inventory Movement
      </h3>
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={inventoryMovementData}
            margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.3)" 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              tickLine={false}
              axisLine={false}
              domain={[0, 3000]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: 'rgba(255,255,255,0.08)',
                borderRadius: '8px',
                color: '#F8FAFC'
              }}
            />
            <Bar dataKey="inward" fill="#3B82F6" radius={[2, 2, 0, 0]} barSize={6} name="Inward" />
            <Bar dataKey="outward" fill="#10B981" radius={[2, 2, 0, 0]} barSize={6} name="Outward" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InventoryMovementChart;