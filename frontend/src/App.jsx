import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGovernance from "./pages/admin/Governance";
import AiToolCatalog from "./pages/admin/AiToolCatalog";
import AdminApproval from "./pages/admin/AdminApproval";
import AuditLogs from "./pages/admin/AuditLogs";
import EmployeeApproval from "./pages/employee/EmpApproval";

// Restored Features
import { PolicyManagement as AiPolicies } from "./features/AiPolicies/AiPolicies";
import { EmployeeChat as AiAssistant } from "./features/AiAssistant/AiAssistant";
import { DocumentScanner as DocScanner } from "./features/DocScanner/DocScanner";

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
    </Routes>
  );
}

export default App;