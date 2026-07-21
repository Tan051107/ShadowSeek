import { useEffect, useState } from 'react';
import { Card, CardContent } from '../common/Card';
import { Loader2, CheckCircle2 } from 'lucide-react';

const STEPS = [
  "Reading document structure",
  "Detecting sensitive information",
  "Applying governance policies",
  "Generating sanitized document"
];

export function FileScanPipeline({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < STEPS.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600); // small delay before showing results
      }
    }, 600);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Card className="border border-blue-100 bg-blue-50/30">
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Governance Scan Pipeline</h3>
        <div className="space-y-4">
          {STEPS.map((stepName, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div 
                key={index} 
                className={`flex items-center space-x-3 transition-opacity duration-300 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
                
                <span className={`font-medium ${
                  isCompleted ? 'text-slate-700' : 
                  isCurrent ? 'text-blue-700' : 'text-slate-500'
                }`}>
                  {stepName}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

