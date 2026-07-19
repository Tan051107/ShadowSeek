import { ShieldCheck, AlertTriangle, XCircle, Check } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';

export function DocumentResult({ result }) {
  if (!result) return null;

  if (result.status === "SAFE") {
    return (
      <Card className="border-emerald-200 bg-emerald-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardContent className="p-6 sm:p-8 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 mb-1">Safe</h3>
            <p className="text-emerald-800 font-medium">No governance issues detected.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isBlocked = result.status === "BLOCKED";
  const Icon = isBlocked ? XCircle : AlertTriangle;
  const colorBase = isBlocked ? "red" : "amber";
  const bgClass = isBlocked ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200";
  const iconBgClass = isBlocked ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600";
  const textTitleClass = isBlocked ? "text-red-900" : "text-amber-900";
  const textDescClass = isBlocked ? "text-red-800" : "text-amber-800";
  
  return (
    <Card className={`${bgClass} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h3 className={`text-xl font-bold ${textTitleClass} flex items-center gap-3 capitalize`}>
                {result.status.toLowerCase()}
              </h3>
              <p className={`font-medium mt-1 ${textDescClass}`}>
                {isBlocked 
                  ? "This document violates a critical governance policy and cannot be used externally." 
                  : "This document contains potentially sensitive information."}
              </p>
            </div>

            <div className="bg-white/80 rounded-xl p-5 border border-white space-y-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Matched Policy</span>
                  <p className="text-slate-900 font-semibold">{result.matchedPolicy}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Severity</span>
                  <Badge variant={isBlocked ? "danger" : "warning"} className="uppercase">
                    {result.severity}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Detected Information</span>
                <div className="flex items-center space-x-2">
                  <Check className={`w-4 h-4 ${isBlocked ? 'text-red-500' : 'text-amber-500'}`} />
                  <span className="text-slate-800 font-medium capitalize">{result.detectedInformation}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Recommendation</span>
                <p className="text-slate-700">{result.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

