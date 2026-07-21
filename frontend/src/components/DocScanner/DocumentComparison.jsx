import { Card, CardContent } from '../common/Card';

export function DocumentComparison({ originalContent, sanitizedContent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Card className="border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
          <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Original Document</h4>
        </div>
        <CardContent className="p-0 flex-1">
          <div className="bg-white p-6 h-[400px] overflow-y-auto font-mono text-sm text-slate-600 whitespace-pre-wrap">
            {originalContent}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-blue-200 shadow-sm overflow-hidden flex flex-col ring-1 ring-blue-100">
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-blue-800 uppercase tracking-widest">Sanitized Document</h4>
          <span className="text-[10px] font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded uppercase">Safe for AI</span>
        </div>
        <CardContent className="p-0 flex-1">
          <div className="bg-blue-50/10 p-6 h-[400px] overflow-y-auto font-mono text-sm text-slate-700 whitespace-pre-wrap">
            {sanitizedContent}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

