import { useState } from 'react';
import SideNavigationBar from "../../components/SideNavigationBar";
import { FileUploader } from './components/FileUploader';
import { FileScanPipeline } from './components/FileScanPipeline';
import { DocumentResult } from './components/DocumentResult';
import { DocumentComparison } from './components/DocumentComparison';
import { DownloadCard } from './components/DownloadCard';
import { scanDocument } from '../GovernanceCore/services/governanceFileService';
import { FileText } from 'lucide-react';

export function DocumentScanner() {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setIsScanning(true);
    setShowResults(false);
    setScanResult(null);

    // Call the mock service
    const result = await scanDocument(uploadedFile);
    setScanResult(result);
  };

  const handlePipelineComplete = () => {
    setIsScanning(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setFile(null);
    setIsScanning(false);
    setShowResults(false);
    setScanResult(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <SideNavigationBar role="employee" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 space-y-8 min-h-screen">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Document Governance Scanner</h1>
          <p className="text-slate-500">
            Securely upload and sanitize documents against organizational policies before using external AI services.
          </p>
        </div>
        
        {file && !isScanning && showResults && (
          <button 
            onClick={handleReset}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Scan Another Document
          </button>
        )}
      </div>

      {!file && (
        <FileUploader onUpload={handleUpload} />
      )}

      {file && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-medium text-slate-800 block">{file.name}</span>
                <span className="text-xs text-slate-500">
                  {isScanning ? "Scanning in progress..." : "Scan complete"}
                </span>
              </div>
            </div>
          </div>

          {isScanning && (
            <FileScanPipeline onComplete={handlePipelineComplete} />
          )}

          {showResults && scanResult && (
            <div className="space-y-6">
              <DocumentResult result={scanResult} />
              
              {scanResult.status !== "SAFE" && (
                <>
                  <DocumentComparison 
                    originalContent={scanResult.originalContent}
                    sanitizedContent={scanResult.sanitizedContent}
                  />
                  
                  <DownloadCard 
                    originalFilename={file.name}
                    sanitizedContent={scanResult.sanitizedContent}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

