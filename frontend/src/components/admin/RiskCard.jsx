import { LuSparkles,LuCircleX, LuFileText } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";

export default function RiskCard({ tool, onViewLabel }) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <LuSparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-base">{tool.name}</h3>
            <p className="text-xs text-slate-500">{tool.provider} · {tool.category}</p>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 ${tool.riskLevel === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tool.riskLevel === 'HIGH' ? 'bg-red-600' : 'bg-yellow-500'}`}></span>
          {tool.riskLevel}
        </span>
      </div>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-semibold text-slate-400 tracking-wider">RISK SCORE</span>
          <div className="text-slate-400 text-xs font-medium">
            <span className="text-xl font-bold text-gray-900">{tool.riskScore}</span> /100
          </div>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${tool.riskScore > 70 ? 'bg-red-600' : 'bg-yellow-500'}`} style={{ width: `${tool.riskScore}%` }}></div>
        </div>
      </div>

      <div className={`flex items-center gap-2 font-semibold text-sm ${tool.approved ? 'text-emerald-600' : 'text-red-600'}`}>
        {tool.approved ? <FiCheckCircle className="w-4 h-4" /> : <LuCircleX className="w-4 h-4" />}
        <span>{tool.approved ? 'Approved' : 'Not Approved'}</span>
      </div>

      <hr className="border-slate-100 -mx-6" />

      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onViewLabel}
          className="flex items-center justify-center gap-1.5 bg-black text-white rounded-xl py-2.5 font-semibold text-xs hover:bg-blue-950 transition"
        >
          <LuFileText className="w-3.5 h-3.5" />
          View Label
        </button>
        <button className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl py-2.5 font-semibold text-xs hover:bg-slate-100 transition">
          Request Access
        </button>
      </div>
    </div>
  );
}