import { useState } from 'react';
import SideNavigationBar from "../../components/SideNavigationBar";
import { GovernanceResultCard } from '../../components/AiAssistant/GovernanceResultCard';
import { checkPrompt } from '../../utils/promptChecker';
import { generateSuggestion } from '../../utils/generateSuggestion';
import { Button } from '../../components/common/Button';
import { Search, Loader2 } from 'lucide-react';

export function EmployeeChat() {
  const [prompt, setPrompt] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [suggestedPrompt, setSuggestedPrompt] = useState("");

  const handleScan = () => {
    if (!prompt.trim()) return;
    
    setIsScanning(true);
    setResult(null);
    setSuggestedPrompt("");

    // Simulate network delay and prompt checking
    setTimeout(() => {
      const checkResult = checkPrompt(prompt);
      setResult(checkResult);
      if (!checkResult.safe) {
        setSuggestedPrompt(generateSuggestion(prompt));
      }
      setIsScanning(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleScan();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <SideNavigationBar role="employee" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Governance Assistant</h1>
        <p className="text-gray-500">
          Verify your prompts against company policies before sending them to external AI services like ChatGPT or Claude.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
        <div className="p-4 border-b border-gray-100 bg-slate-50">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enter Prompt to Scan</label>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isScanning}
          placeholder="e.g., Explain recursion in Python..."
          className="w-full h-40 p-4 resize-none outline-none text-slate-700 bg-white placeholder:text-slate-400"
        />
        <div className="p-4 border-t border-gray-100 bg-slate-50 flex justify-between items-center">
          <span className="text-xs text-slate-400">Press <kbd className="font-mono bg-slate-200 px-1 rounded text-slate-600">Enter</kbd> to scan, <kbd className="font-mono bg-slate-200 px-1 rounded text-slate-600">Shift + Enter</kbd> for new line.</span>
          <Button 
            variant="primary" 
            onClick={handleScan} 
            disabled={!prompt.trim() || isScanning}
            className="flex items-center gap-2 min-w-30 justify-center"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Scan Prompt
              </>
            )}
          </Button>
        </div>
      </div>

      {isScanning && (
        <div className="animate-pulse flex items-center justify-center space-x-3 text-blue-600 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium text-sm">Checking against your organization's governance policies...</span>
        </div>
      )}

      {!isScanning && result && (
        <GovernanceResultCard 
          result={result} 
          originalPrompt={prompt} 
          suggestedPrompt={suggestedPrompt}
        />
      )}
        </div>
      </div>
    </div>
  );
}

