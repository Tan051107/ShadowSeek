import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { LuSparkles } from "react-icons/lu";
import { 
  RiShieldCheckLine,
  RiSearch2Line,
  RiTodoLine,
  RiListIndefinite,
  RiChatSettingsFill,
  RiSettings3Line,
  RiRobot2Line,
  RiFileSearchLine,
  RiDashboardLine
} from "react-icons/ri";

const adminNavigation = [
  {
    name: "Governance",
    href: "/admin/governance",
    icon: <RiShieldCheckLine className="h-5 w-5" />
  },
  {
    name: "AI Tool Catalog",
    href: "/admin/ai-tool-catalog",
    icon: <RiSearch2Line className="h-5 w-5" />
  },
  {
    name: "Approvals",
    href: "/admin/approvals",
    icon: <RiTodoLine className="h-5 w-5" />
  },
  {
    name: "Audit Logs",
    href: "/admin/audit-logs",
    icon: <RiListIndefinite className="h-5 w-5" />
  },
  {
    name: "Policies & Analytics",
    href: "/admin/policies",
    icon: <RiSettings3Line className="h-5 w-5" />
  }
];

const employeeNavigation = [
  {
    name: "Approvals",
    href: "/employee/approval",
    icon: <RiTodoLine className="h-5 w-5" />
  },
  {
    name: "AI Governance Assistant",
    href: "/employee/chat",
    icon: <RiRobot2Line className="h-5 w-5" />
  },
  {
    name: "Document Scanner",
    href: "/employee/scanner",
    icon: <RiFileSearchLine className="h-5 w-5" />
  }
];

function SideNavigationBar({ role = "admin" }) {
  const isAdmin = role === "admin";
  const navigation = isAdmin ? adminNavigation : employeeNavigation;

  return (
    <aside className="flex h-screen sticky top-0 w-72 flex-col border-r border-slate-200 bg-slate-950 text-slate-100">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <img
          src={logo}
          alt="ShadowSeek logo"
          className="h-10 w-10 rounded-xl border border-slate-200 bg-white object-contain p-1 shadow-sm"
        />
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">ShadowSeek</p>
          {/* Dynamic subtitle text */}
          <p className="text-xs text-slate-400">
            {isAdmin ? "Admin portal" : "Employee portal"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-2 py-2 text-sm font-small transition ${
                isActive
                  ? "bg-white text-black shadow-lg shadow-white/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="flex h-6 w-6 items-center justify-center ">
              {item.icon}
            </span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Compliance Score Box */}
      <div className="p-4 border-t border-white/5">
        <div className="rounded-xl bg-slate-900/50 p-4 border border-white/5">
          <div className="flex items-center gap-2 text-cyan-400">
            <LuSparkles className="h-5 w-5" />
            <span className="text-sm font-small text-slate-200">Compliance Score</span>
          </div>
          
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-white">94</span>
            <span className="text-sm text-slate-500">/ 100</span>
          </div>

          <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800">
            <div 
              className="h-1.5 rounded-full bg-cyan-400" 
              style={{ width: "94%" }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideNavigationBar;
