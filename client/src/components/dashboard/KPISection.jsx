import React from 'react';
import StatCard from './StatCard.jsx';
import { kpiData } from '../../data/dashboardData.js';
import { Layers, CheckCircle2, AlertTriangle, Plane, Factory, DollarSign } from 'lucide-react';

const ICON_MAP = {
  'total-parts': Layers,
  'available-inventory': CheckCircle2,
  'low-stock-items': AlertTriangle,
  'aircraft-supported': Plane,
  'manufacturers': Factory,
  'inventory-value': DollarSign,
};

function KPISection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
      {kpiData.map((kpi) => {
        const IconComponent = ICON_MAP[kpi.id] || Layers;
        return (
          <StatCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            trendType={kpi.trendType}
            color={kpi.color}
            sparkline={kpi.sparkline}
            icon={IconComponent}
          />
        );
      })}
    </div>
  );
}

export default KPISection;