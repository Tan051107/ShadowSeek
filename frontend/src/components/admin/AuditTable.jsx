import { LuFileText, LuEye } from "react-icons/lu";
import activityData from "../../data/auditlog.json";

const riskStyles = {
  HIGH: { badge: 'bg-red-50 text-red-600', dot: 'bg-red-600' },
  MEDIUM: { badge: 'bg-orange-50 text-orange-600', dot: 'bg-orange-500' },
  LOW: { badge: 'bg-green-50 text-green-600', dot: 'bg-green-500' }
};

// 1. Accept all filter properties passed down from the parent
export default function AuditTable({ searchTerm = "", selectedDept = "All", selectedRisk = "All", selectedTool = "All" }) {
  
  // 2. Compute the compound filtered data array
  const filteredData = activityData.filter((row) => {
    // Match textual search query
    const matchesSearch = 
      row.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.action.toLowerCase().includes(searchTerm.toLowerCase());

    // Match structured selection selectors
    const matchesDept = selectedDept === "All" || row.department === selectedDept;
    const matchesRisk = selectedRisk === "All" || row.riskLevel === selectedRisk;
    const matchesTool = selectedTool === "All" || row.tool === selectedTool;

    return matchesSearch && matchesDept && matchesRisk && matchesTool;
  });

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden font-sans">
      
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <LuFileText className="h-5 w-5 text-blue-900" />
          <h2 className="text-base font-semibold text-slate-900">Today's Activity</h2>
          <span className="text-xs text-slate-400 font-medium">· {filteredData.length} events</span>
        </div>
        <span className="text-xs text-slate-400 font-medium">Auto-refreshed 2 min ago</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/60 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              <th className="py-3 px-6">User</th>
              <th className="py-3 px-6">Department</th>
              <th className="py-3 px-6">Tool</th>
              <th className="py-3 px-6">Risk</th>
              <th className="py-3 px-6">Action</th>
              <th className="py-3 px-6">Timestamp</th>
              <th className="py-3 px-6 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs flex items-center justify-center shrink-0">
                      {row.userInitials}
                    </div>
                    <span className="font-semibold text-slate-900">{row.userName}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-500 font-medium">{row.department}</td>
                <td className="py-4 px-6 text-slate-900 font-medium">{row.tool}</td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide inline-flex items-center gap-1.5 ${riskStyles[row.riskLevel]?.badge || 'bg-slate-50 text-slate-600'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${riskStyles[row.riskLevel]?.dot || 'bg-slate-500'}`}></span>
                    {row.riskLevel}
                  </span>
                </td>
                <td className={`py-4 px-6 font-semibold ${row.action === 'Requested Approval' ? 'text-blue-800' : 'text-slate-900'}`}>{row.action}</td>
                <td className="py-4 px-6 text-slate-500 font-medium">{row.timestamp}</td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-800 hover:text-slate-900 p-1 rounded-md hover:bg-slate-100 transition-colors">
                    <LuEye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-sm text-slate-400">
                  No activities match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}