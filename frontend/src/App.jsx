import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGovernance from "./pages/admin/Governance";
import AiToolCatalog from "./pages/admin/AiToolCatalog";
import AdminApproval from "./pages/admin/AdminApproval";
import AuditLogs from "./pages/admin/AuditLogs";
import EmployeeApproval from "./pages/employee/EmpApproval";
import { PolicyManagement as AiPolicies } from "./pages/admin/AiPolicies";
import { EmployeeChat as AiAssistant } from "./pages/employee/AiAssistant";
import { DocumentScanner as DocScanner } from "./pages/employee/DocScanner";
import Chatbot from "./pages/employee/Chatbot";
import './App.css'
import MockAIChat from "./pages/mock-ai-models/MockAIChat";
import CompanyAIChat from "./pages/mock-ai-models/CompanyAIChat";
import ExecutiveDashboard from "./pages/admin/ExecutiveDashboard";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/admin/governance"
        element={
          <ProtectedRoute role="admin">
            <AdminGovernance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/ai-tool-catalog"
        element={
          <ProtectedRoute role="admin">
            <AiToolCatalog />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/approvals"
        element={
          <ProtectedRoute role="admin">
            <AdminApproval />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/audit-logs"
        element={
          <ProtectedRoute role="admin">
            <AuditLogs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/policies"
        element={
          <ProtectedRoute role="admin">
            <AiPolicies />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/approval"
        element={
          <ProtectedRoute role="employee">
            <EmployeeApproval />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/chat"
        element={
          <ProtectedRoute role="employee">
            <AiAssistant />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/scanner"
        element={
          <ProtectedRoute role="employee">
            <DocScanner />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <ExecutiveDashboard/>
          </ProtectedRoute>
        }
      />

      <Route
          path="/ai-chat"
          element={<MockAIChat/>}
      />
      <Route
          path="/company-ai"
          element={<CompanyAIChat/>}
      />
    </Routes>
  );
}

export default App;
