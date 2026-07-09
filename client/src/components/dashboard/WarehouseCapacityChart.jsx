import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { warehouseCapacityData } from '../../data/dashboardData.js';

function WarehouseCapacityChart() {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-col h-[155px] w-full">
      <h3 className="text-sm font-semibold text-[#F8FAFC]/80 mb-2 tracking-wide">
        Warehouse Capacity Bar Chart
      </h3>
      <div className="flex-1 w-full text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={warehouseCapacityData}
            margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
            barSize={16}
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
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: 'rgba(255,255,255,0.08)',
                borderRadius: '8px',
                color: '#F8FAFC'
              }}
              formatter={(value) => [`${value}%`, 'Capacity']}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WarehouseCapacityChart;