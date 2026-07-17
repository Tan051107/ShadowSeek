import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-md" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} border border-gray-100 p-0 relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]`}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 sticky top-0">
            <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-800">{title}</h2>
          </div>
        )}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full p-1.5 opacity-70 bg-gray-100 hover:bg-gray-200 hover:opacity-100 transition-all focus:outline-none text-gray-500"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
