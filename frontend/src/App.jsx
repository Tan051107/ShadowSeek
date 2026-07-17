import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGovernance from "./pages/admin/Governance";
import EmployeeApproval from "./pages/employee/EmpApproval";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
import MockAIChat from "./MockAIChat";
import CompanyAIChat from "./CompanyAIChat";
import ExecutiveDashboard from "./ExecutiveDashboard";

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
    </Routes>
  );
    <BrowserRouter>
      <Routes>
        <Route
          path="/ai-chat"
          element={<MockAIChat/>}
        />
        <Route
          path="/company-ai"
          element={<CompanyAIChat/>}
        />
        <Route
          path="/dashboard"
          element={<ExecutiveDashboard/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;