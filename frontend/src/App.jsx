import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminGovernance from "./pages/admin/Governance";
import EmployeeApproval from "./pages/employee/EmpApproval";

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
}

export default App;