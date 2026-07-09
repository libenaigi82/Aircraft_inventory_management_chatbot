import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { aiInsightsData } from '../../data/dashboardData.js';

function AIInsights() {
  const { alertsCount, healthScore, predictedShortageDays, estimatedCost } = aiInsightsData;

  return (
    <div className="glass-card p-4 rounded-xl w-full">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-[#F8FAFC]/80 tracking-wide">
          AI Insights
        </h3>
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Insight Item 1 */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div className="p-2 rounded-md bg-[#EF4444]/10 text-[#EF4444]">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#F8FAFC]">
              {alertsCount} critical inventory alerts detected
            </div>
            <div className="text-[11px] text-[#F8FAFC]/40 mt-0.5">Requires immediate attention</div>
          </div>
        </div>

        {/* Insight Item 2 */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div className="p-2 rounded-md bg-[#10B981]/10 text-[#10B981]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#F8FAFC]">
              Inventory health score {healthScore}%
            </div>
            <div className="text-[11px] text-[#F8FAFC]/40 mt-0.5">Optimal operational threshold</div>
          </div>
        </div>

        {/* Insight Item 3 */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div className="p-2 rounded-md bg-[#F59E0B]/10 text-[#F59E0B]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#F8FAFC]">
              Predicted shortage in {predictedShortageDays} days
            </div>
            <div className="text-[11px] text-[#F8FAFC]/40 mt-0.5">Based on velocity patterns</div>
          </div>
        </div>

        {/* Insight Item 4 */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <div className="p-2 rounded-md bg-[#3B82F6]/10 text-[#3B82F6]">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#F8FAFC]">
              Estimated procurement cost ${estimatedCost.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#F8FAFC]/40 mt-0.5">Budget allocation optimization</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;