import { ShieldCheck, AlertTriangle, XCircle, Copy, RefreshCw } from "lucide-react";
import { Card, CardContent } from "../../../components/common/Card";
import { Button } from "../../../components/common/Button";
import { Badge } from "../../../components/common/Badge";

export function GovernanceResultCard({ result, originalPrompt, suggestedPrompt }) {
  if (result.safe) {
    return (
      <Card className="border-green-200 bg-green-50/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardContent className="pt-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-green-900 mb-1">Safe</h3>
            <p className="text-green-800 font-medium">No governance issues detected.</p>
          </div>
          <div className="pt-2">
            <Button variant="primary" className="bg-green-600 hover:bg-green-700 focus:ring-green-500 flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Prompt & Proceed to AI
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { policy, matchedKeyword } = result;
  const isBlocked = policy.action === "Block";
  const isWarning = policy.action === "Warn" || policy.action === "Sanitize";

  if (isBlocked) {
    return (
      <Card className="border-red-200 bg-red-50/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex flex-shrink-0 items-center justify-center mt-1">
              <XCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
                  Blocked
                  <Badge variant="danger" className="ml-2 uppercase tracking-widest text-[10px]">{policy.severity}</Badge>
                </h3>
                <p className="text-red-800 mt-1 font-medium">This prompt violates a critical governance rule and cannot be sent.</p>
              </div>

              <div className="bg-white/80 rounded-lg p-4 border border-red-100 space-y-3">
                <div>
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wide">Matched Rule</span>
                  <p className="text-gray-900 font-medium">{policy.name}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wide">Reason</span>
                  <p className="text-gray-700 text-sm">{policy.description}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wide">Detected Information</span>
                  <p className="text-gray-900 text-sm mt-1">
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">{matchedKeyword}</span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-red-800 uppercase tracking-wide">Recommendation</span>
                  <p className="text-gray-700 text-sm">{policy.recommendation}</p>
                </div>
              </div>

              {suggestedPrompt && suggestedPrompt !== originalPrompt && (
                <div className="bg-white/80 rounded-lg p-4 border border-blue-100 mt-4">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2 block">Suggested Safe Prompt</span>
                  <p className="text-gray-700 text-sm font-mono bg-slate-50 p-3 rounded border border-slate-200 mb-3 whitespace-pre-wrap">{suggestedPrompt}</p>
                  <div className="flex gap-3">
                    <Button variant="primary" className="flex-1 flex justify-center items-center gap-2" onClick={() => navigator.clipboard.writeText(suggestedPrompt)}>
                      <Copy className="w-4 h-4" />
                      Copy Safe Prompt
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Warning State
  return (
    <Card className="border-amber-200 bg-amber-50/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex flex-shrink-0 items-center justify-center mt-1">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                Warning
                <Badge variant="warning" className="ml-2 uppercase tracking-widest text-[10px]">{policy.severity}</Badge>
              </h3>
              <p className="text-amber-800 mt-1 font-medium">Prompt contains potentially sensitive information.</p>
            </div>

            <div className="bg-white/80 rounded-lg p-4 border border-amber-100 space-y-3">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Matched Rule</span>
                <p className="text-gray-900 font-medium">{policy.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Detected Information</span>
                  <p className="text-gray-900 text-sm mt-1">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">{matchedKeyword}</span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Recommendation</span>
                  <p className="text-gray-700 text-sm mt-1">{policy.recommendation}</p>
                </div>
              </div>
            </div>

            {suggestedPrompt && suggestedPrompt !== originalPrompt && (
              <div className="bg-white/80 rounded-lg p-4 border border-blue-100 mt-4">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-2 block">Suggested Safe Prompt</span>
                <p className="text-gray-700 text-sm font-mono bg-slate-50 p-3 rounded border border-slate-200 mb-3 whitespace-pre-wrap">{suggestedPrompt}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1 text-slate-700 border-slate-200 hover:bg-slate-50 flex justify-center items-center gap-2" onClick={() => navigator.clipboard.writeText(suggestedPrompt)}>
                    <Copy className="w-4 h-4" />
                    Copy Safe Prompt
                  </Button>
                  <Button variant="primary" className="flex-1 bg-amber-600 hover:bg-amber-700 focus:ring-amber-500">
                    Proceed Anyway
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

