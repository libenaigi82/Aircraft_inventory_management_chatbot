export const kpiData = [
  {
    id: 'total-parts',
    title: 'Total Parts',
    value: '48,760',
    trend: '+2.5%',
    trendType: 'up',
    color: '#3B82F6',
    sparkline: [30, 40, 35, 50, 49, 60, 70, 91]
  },
  {
    id: 'available-inventory',
    title: 'Available Inventory',
    value: '42,110',
    trend: '86.4%',
    trendType: 'nominal',
    color: '#10B981',
    sparkline: [80, 81, 84, 83, 85, 86.4]
  },
  {
    id: 'low-stock-items',
    title: 'Low Stock Items',
    value: '519',
    trend: 'Critical',
    trendType: 'down',
    color: '#EF4444',
    sparkline: [600, 580, 550, 540, 530, 519]
  },
  {
    id: 'aircraft-supported',
    title: 'Aircraft Supported',
    value: '218',
    trend: 'active',
    trendType: 'neutral',
    color: '#38BDF8',
    sparkline: [210, 212, 215, 214, 216, 218]
  },
  {
    id: 'manufacturers',
    title: 'Manufacturers',
    value: '89',
    trend: 'vendors',
    trendType: 'neutral',
    color: '#A855F7',
    sparkline: [85, 86, 86, 88, 88, 89]
  },
  {
    id: 'inventory-value',
    title: 'Inventory Value',
    value: '$320.5M',
    trend: '1.8%',
    trendType: 'up',
    color: '#F59E0B',
    sparkline: [310, 312, 315, 314, 318, 320.5]
  }
];

export const inventoryTrendData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 16000 },
  { name: 'Mar', value: 13000 },
  { name: 'Apr', value: 23000 },
  { name: 'May', value: 19000 },
  { name: 'Jun', value: 28000 }
];

export const stockDistributionData = [
  { name: 'Consumables', value: 40, color: '#3B82F6' },
  { name: 'Expendables', value: 30, color: '#10B981' },
  { name: 'Rotables', value: 18, color: '#F59E0B' },
  { name: 'Repairables', value: 12, color: '#EF4444' }
];

export const warehouseCapacityData = [
  { name: 'Location', value: 90 },
  { name: 'Lost', value: 65 },
  { name: 'Natjant', value: 30 },
  { name: 'Refal', value: 40 },
  { name: 'Warehous', value: 60 }
];

export const inventoryMovementData = [
  { name: 'Jan', inward: 1200, outward: 800 },
  { name: 'Feb', inward: 1800, outward: 1400 },
  { name: 'Mar', inward: 1500, outward: 1100 },
  { name: 'Apr', inward: 2400, outward: 1900 },
  { name: 'May', inward: 2000, outward: 1600 },
  { name: 'Jun', inward: 2900, outward: 2300 },
  { name: 'Jul', inward: 2100, outward: 1700 },
  { name: 'Aug', inward: 2500, outward: 2100 }
];

export const aiInsightsData = {
  alertsCount: 8,
  healthScore: 94,
  predictedShortageDays: 5,
  estimatedCost: 12450
};