import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

function StatCard({ title, value, trend, trendType, color, sparkline, icon: Icon }) {
  const getTrendClass = (type) => {
    switch (type) {
      case 'up':
        return 'text-[#10B981]';
      case 'down':
        return 'text-[#EF4444]';
      case 'nominal':
        return 'text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded text-xs';
      default:
        return 'text-[#F8FAFC]/60';
    }
  };

  const chartData = sparkline.map((val, idx) => ({ id: idx, value: val }));

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card p-4 rounded-xl relative overflow-hidden flex flex-col justify-between h-[115px] group"
    >
      {/* Soft internal indicator glow */}
      <div 
        className="absolute top-0 left-0 w-full h-[2px] opacity-40 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
      />
      
      <div className="flex items-center justify-between w-full">
        <span className="text-xs font-medium text-[#F8FAFC]/50 tracking-wider uppercase">
          {title}
        </span>
        <div 
          className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[#F8FAFC]/80 group-hover:text-white transition-colors"
          style={{ boxShadow: `0 0 10px ${color}15` }}
        >
          <Icon className="w-4 h-4" style={{ color: color }} />
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-2">
        <div>
          <div className="text-2xl font-bold tracking-tight text-[#F8FAFC]">
            {value}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-xs font-semibold ${getTrendClass(trendType)}`}>
              {trend}
            </span>
          </div>
        </div>

        {/* Sparkline Visual Component */}
        <div className="w-20 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;    