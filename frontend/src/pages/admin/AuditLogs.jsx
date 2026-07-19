import { useState } from "react";
import SideNavigationBar from "../../components/SideNavigationBar";
import { RiSearch2Line } from "react-icons/ri";
import { LuShieldCheck } from "react-icons/lu";
// 1. Import your ActivityTable component
import ActivityTable from "../../components/admin/AuditTable"; 

function AuditLogs() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [riskLevel, setRiskLevel] = useState("All");
  const [tool, setTool] = useState("All");
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNavigationBar role="admin" />
      <main className="flex-1">
        <div className="border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                AI Activity Audit Log
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                Privacy-preserving trail — actions and metadata only. Prompts
                and content are never stored.
              </p>
            </div>
          </div>
        </div>

        <div className="m-6 flex flex-col gap-6">
          <div className="border rounded-lg border-blue-200 bg-blue-50 px-6 py-4 shadow-sm">
            <div className="flex items-center gap-2">
              <LuShieldCheck className="w-6 h-6 text-blue-500 mr-2" />
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Ethical monitoring:</span> This
                log records governance actions and risk metadata only. Actual
                prompts, uploaded files, and AI responses are never captured.
              </p>
            </div>
          </div>

          {/* 2. Filter Controls Wrapper Row */}
          <div className="w-full bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center gap-3">
            
            {/* Search Field */}
            <label className="flex flex-1 min-w-[200px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-xs">
              <RiSearch2Line className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search user or action..."
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </label>

            {/* Department Dropdown */}
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none shadow-xs cursor-pointer min-w-[150px]"
            >
              <option value="All">All departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
            </select>

            {/* Risk Level Dropdown */}
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none shadow-xs cursor-pointer min-w-[150px]"
            >
              <option value="All">All risk levels</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            {/* Tool Dropdown */}
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none shadow-xs cursor-pointer min-w-[150px]"
            >
              <option value="All">All tools</option>
              <option value="ChatGPT Free">ChatGPT Free</option>
              <option value="Claude Free">Claude Free</option>
            </select>

          </div>

          {/* 3. Pass all selection values as props down to the table */}
          <ActivityTable 
            searchTerm={search}
            selectedDept={department}
            selectedRisk={riskLevel}
            selectedTool={tool}
          />
        </div>
      </main>
    </div>
  );
}

export default AuditLogs;