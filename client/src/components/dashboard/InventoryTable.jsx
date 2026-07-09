import React from 'react';
import { inventoryTableData } from '../../data/inventoryData.js';
import { STATUS_BADGES } from '../../utils/constants.js';

function InventoryTable() {
  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[#F8FAFC]/40 text-[11px] font-semibold uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Part Number</th>
              <th className="px-6 py-4 font-medium">Part Name</th>
              <th className="px-6 py-4 font-medium">ATA Chapter</th>
              <th className="px-6 py-4 font-medium">Manufacturer</th>
              <th className="px-6 py-4 font-medium">Warehouse</th>
              <th className="px-6 py-4 font-medium text-center">Available Quantity</th>
              <th className="px-6 py-4 text-center font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {inventoryTableData.map((row) => {
              const badge = STATUS_BADGES[row.status] || STATUS_BADGES.AVAILABLE;
              
              return (
                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4.5 font-sans font-bold text-[#F8FAFC] max-w-[160px] whitespace-pre-wrap leading-relaxed">
                    {row.partNumber}
                  </td>
                  <td className="px-6 py-4.5 font-mono text-[#F8FAFC]/70">{row.partName}</td>
                  <td className="px-6 py-4.5 text-[#F8FAFC]/50 font-mono">{row.ataChapter}</td>
                  <td className="px-6 py-4.5 text-[#F8FAFC]/80">{row.manufacturer}</td>
                  <td className="px-6 py-4.5 text-[#F8FAFC]/60">{row.warehouse}</td>
                  <td className="px-6 py-4.5 font-mono font-bold text-center text-[#F8FAFC]">
                    {row.availableQuantity}
                  </td>
                  <td className="px-6 py-4.5 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium ${badge.color}`}>
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4.5 text-[#F8FAFC]/40 font-mono whitespace-nowrap">{row.lastUpdated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryTable;