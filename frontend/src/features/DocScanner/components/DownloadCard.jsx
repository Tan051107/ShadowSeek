import { Download } from 'lucide-react';
import { Card, CardContent } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';

export function DownloadCard({ originalFilename, sanitizedContent }) {
  
  const handleDownload = () => {
    // Basic filename manipulation for the mock download
    const nameWithoutExt = originalFilename.substring(0, originalFilename.lastIndexOf('.')) || originalFilename;
    const downloadFilename = `${nameWithoutExt}_Sanitized.txt`;

    // Create Blob and trigger download
    const blob = new Blob([sanitizedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFilename;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="border border-slate-200 bg-slate-50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
      <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Governance Review Complete</h3>
          <p className="text-sm text-slate-500">Download the sanitized document to safely use with external AI services.</p>
        </div>
        
        <Button variant="primary" onClick={handleDownload} className="flex items-center gap-2 whitespace-nowrap bg-blue-600 hover:bg-blue-700 shrink-0">
          <Download className="w-4 h-4" />
          Download Sanitized Document
        </Button>
      </CardContent>
    </Card>
  );
}

