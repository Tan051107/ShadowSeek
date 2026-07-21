import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

import SideNavigationBar from "../../components/SideNavigationBar";
// 1. Import your card component and your mock database array
import RiskCard from "../../components/admin/RiskCard"; 
import toolsList from "../../data/aitoolcatalog.json";

function AiToolCatalog({ role = "admin" }) {
  const [search, setSearch] = useState("");
  const [activeTool, setActiveTool] = useState(null); // Tracks the tool open in the modal

  // 2. Filter tools based on search input
  const filteredTools = toolsList.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNavigationBar role={role} />
      <main className="flex-1">
        <div className="border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                AI Tool Catalog
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                Review approved AI tools, manage categories, and keep governance
                controls in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="m-6 flex flex-col gap-6">
          <label className="flex w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
            <RiSearch2Line className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search AI tools"
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>

          {/* 3. Render cards in a responsive grid container */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <RiskCard 
                key={tool.id} 
                tool={tool} 
                role={role}
                onViewLabel={() => setActiveTool(tool)} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* 4. Render the modal inside the dashboard layout when active */}
      {activeTool && (
        <RiskLabelModal
          tool={activeTool}
          role={role}
          onClose={() => setActiveTool(null)}
        />
      )}
    </div>
  );
}

export default AiToolCatalog;

// --- MODAL COMPONENT ---
// Keeps the file clean by separating the modal view
import { LuSparkles,LuX, LuCircleX, LuShield, LuLock, LuCheckCheck, LuDatabase, LuGraduationCap } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";

function RiskLabelModal({ tool, onClose, role = "admin" }) {
  const showApprovalAction = !tool.approved;
  const approvalActionLabel = role === "admin" ? "Approve" : "Request Approval";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-start border-b border-gray-100">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <LuSparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{tool.name}</h3>
              <p className="text-sm text-gray-500">{tool.labelSubtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"><LuX className="w-6 h-6" /></button>
        </div>

        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider block mb-1">RISK SCORE</span>
                <div className="text-gray-400 font-medium">
                  <span className="text-3xl font-bold text-gray-900">{tool.riskScore}</span> /100
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5 ${tool.riskLevel === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tool.riskLevel === 'HIGH' ? 'bg-red-600' : 'bg-yellow-500'}`}></span>
                {tool.riskLevel}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-center">
              <span className="text-xs font-semibold text-slate-400 tracking-wider mb-1">APPROVAL</span>
              <div className={`flex items-center gap-2 font-semibold text-base ${tool.approved ? 'text-emerald-600' : 'text-red-600'}`}>
                {tool.approved ? <FiCheckCircle className="w-5 h-5" /> : <LuCircleX className="w-5 h-5" />}
                <span>{tool.approved ? 'Approved' : 'Not Approved'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase"><LuShield className="w-4 h-4" /><span>Risk Factors</span></div>
            <ul className="flex flex-col gap-2 pl-1">
              {tool.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-red-500 font-bold mt-0.5">•</span>{factor}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-red-600 font-bold text-xs tracking-wider uppercase"><LuLock className="w-4 h-4" /><span>Unsafe to share</span></div>
              <div className="flex fleborderx-col gap-2.5">
                {tool.unsafeToShare.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium"><LuCircleX className="w-4 h-4 text-red-500 shrink-0" />{item}</div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs tracking-wider uppercase"><LuCheckCheck className="w-4 h-4" /><span>Allowed Usage</span></div>
              <div className="flex flex-col gap-2.5">
                {tool.allowedUsage.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium"><FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase"><LuDatabase className="w-4 h-4" /><span>Data Retention</span></div>
              <p className="text-sm text-slate-600">{tool.dataRetention}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase"><LuGraduationCap className="w-4 h-4" /><span>Training Usage</span></div>
              <p className="text-sm text-slate-600">{tool.trainingUsage}</p>
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.813 15.904L9 21l8.904-4.813a3 3 0 011.916-1.916L21 9l-5.096-.813a3 3 0 01-1.916-1.916L13 1.1 9.813 6.187a3 3 0 01-1.916 1.916L2.813 9l5.096.813a3 3 0 011.916 1.916z" /></svg>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Recommended Alternative</span>
                <span className="font-semibold text-slate-900 text-sm">{tool.recommendedAlternative.name}</span>
              </div>
            </div>
            <button className="bg-white border border-slate-200 text-gray-800 rounded-xl px-4 py-2 font-semibold text-xs flex items-center gap-1 hover:bg-slate-50 shadow-xs">
              Switch <HiArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className={`p-6 border-t border-gray-100 ${showApprovalAction ? "grid grid-cols-2" : "grid grid-cols-1"} gap-3 bg-white`}>
          {showApprovalAction && (
            <button className="bg-black text-white rounded-xl py-3 font-semibold text-sm hover:bg-blue-950">
              {approvalActionLabel}
            </button>
          )}
          <button className="bg-slate-50 border border-slate-200 text-gray-800 rounded-xl py-3 font-semibold text-sm hover:bg-slate-100">View Policy</button>
        </div>
      </div>
    </div>
  );
}