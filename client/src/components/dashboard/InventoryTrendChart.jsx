import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { inventoryTrendData } from '../../data/dashboardData.js';

function InventoryTrendChart() {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-col h-[280px] w-full">
      <h3 className="text-sm font-semibold text-[#F8FAFC]/80 mb-3 tracking-wide">
        Inventory Trend Line Chart
      </h3>
      <div className="flex-1 w-full text-[11px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={inventoryTrendData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
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
              domain={[0, 30000]}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: 'rgba(255,255,255,0.08)',
                borderRadius: '8px',
                color: '#F8FAFC'
              }}
              formatter={(value) => [value.toLocaleString(), 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#trendGradient)"
              dot={{ r: 3, stroke: '#3B82F6', strokeWidth: 2, fill: '#0F172A' }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InventoryTrendChart;