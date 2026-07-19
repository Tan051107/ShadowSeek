import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { Card, CardContent } from '../common/Card';

export function FileUploader({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Card 
      className={`border-2 border-dashed transition-all cursor-pointer ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Select or drag a document here
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          PDF, DOCX, TXT, or images up to 50MB. Our system will automatically scan and redact sensitive information before you upload to external AI tools.
        </p>
        <button 
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          Browse Files
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
        />
      </CardContent>
    </Card>
  );
}

