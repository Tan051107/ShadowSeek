import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGovernance from "./pages/admin/Governance";
import EmployeeApproval from "./pages/employee/EmpApproval";
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
        path="/employee/empApproval"
        element={
          <ProtectedRoute role="employee">
            <EmployeeApproval />
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