import { BrowserRouter,Routes,Route } from "react-router-dom";
import './App.css'
import MockAIChat from "./MockAIChat";
import CompanyAIChat from "./CompanyAIChat";
import ExecutiveDashboard from "./ExecutiveDashboard";

function App() {
  return (
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

export default App
