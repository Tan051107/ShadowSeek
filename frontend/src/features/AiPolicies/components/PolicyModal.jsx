import { useEffect, useState } from "react";
import {
  Shield,
  Lock,
  FileCheck,
  Lightbulb,
  Plus,
  X,
  AlertTriangle,
  Info
} from "lucide-react";
import { Modal } from "../../../components/common/Modal";
import { Button } from "../../../components/common/Button";
import { Badge } from "../../../components/common/Badge";

const categories = [
  { value: "Privacy", icon: Shield, color: "text-blue-600 bg-blue-100 border-blue-200" },
  { value: "Security", icon: Lock, color: "text-red-600 bg-red-100 border-red-200" },
  { value: "Compliance", icon: FileCheck, color: "text-green-600 bg-green-100 border-green-200" },
  { value: "Governance", icon: Lightbulb, color: "text-purple-600 bg-purple-100 border-purple-200" },
  { value: "Confidentiality", icon: AlertTriangle, color: "text-orange-600 bg-orange-100 border-orange-200" }
];

const severities = ["Low", "Medium", "High", "Critical"];
const actions = ["Warn", "Block", "Sanitize"];

export function PolicyModal({ isOpen, onClose, onSave, initialData }) {
  const [keywordInput, setKeywordInput] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Privacy",
    severity: "Medium",
    action: "Warn",
    status: "Active",
    keywords: [],
    recommendation: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        keywords: Array.isArray(initialData.keywords) ? initialData.keywords : []
      });
    } else {
      setFormData({
        name: "",
        description: "",
        category: "Privacy",
        severity: "Medium",
        action: "Warn",
        status: "Active",
        keywords: [],
        recommendation: ""
      });
    }
  }, [initialData, isOpen]);

  const addKeyword = () => {
    if (keywordInput.trim() === "") return;
    if (formData.keywords.includes(keywordInput.trim())) return;
    setFormData({ ...formData, keywords: [...formData.keywords, keywordInput.trim()] });
    setKeywordInput("");
  };

  const removeKeyword = (kw) => {
    setFormData({ ...formData, keywords: formData.keywords.filter((k) => k !== kw) });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: initialData?.id || Date.now() });
  };

  const getSeverityColor = (level) => {
    switch(level) {
      case 'Critical': return 'bg-red-500 text-white border-red-600';
      case 'High': return 'bg-orange-500 text-white border-orange-600';
      case 'Medium': return 'bg-yellow-500 text-white border-yellow-600';
      case 'Low': return 'bg-green-500 text-white border-green-600';
      default: return 'bg-slate-900 text-white border-slate-900';
    }
  };

  const getActionColor = (action) => {
    switch(action) {
      case 'Block': return 'bg-red-600 text-white border-red-700';
      case 'Sanitize': return 'bg-blue-600 text-white border-blue-700';
      case 'Warn': return 'bg-amber-500 text-white border-amber-600';
      default: return 'bg-slate-900 text-white border-slate-900';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Edit Policy" : "Create New Policy"} maxWidth="max-w-5xl">
      <form onSubmit={submit} className="flex flex-col lg:flex-row h-full max-h-[85vh]">
        {/* Left Column: Form Inputs */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8 bg-white">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rule Name</label>
              <input
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="e.g. Personal Data Protection"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
              <textarea
                rows={2}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-400"
                placeholder="Describe the purpose of this governance rule..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.value;
                return (
                  <button
                    type="button"
                    key={cat.value}
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? `${cat.color} ring-1 ring-offset-1 ring-${cat.color.split('-')[1]}-500 shadow-sm`
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{cat.value}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Severity</label>
              <div className="flex flex-wrap gap-2">
                {severities.map((level) => {
                  const isSelected = formData.severity === level;
                  return (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setFormData({ ...formData, severity: level })}
                      className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                        isSelected
                          ? getSeverityColor(level)
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Action</label>
              <div className="flex flex-wrap gap-2">
                {actions.map((action) => {
                  const isSelected = formData.action === action;
                  return (
                    <button
                      type="button"
                      key={action}
                      onClick={() => setFormData({ ...formData, action })}
                      className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all ${
                        isSelected
                          ? getActionColor(action)
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {action}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span>Detection Keywords</span>
              <div className="group relative flex items-center justify-center">
                <Info className="w-4 h-4 text-slate-400 cursor-help" />
                <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-slate-800 text-white text-xs rounded p-2 z-10 shadow-lg text-center">
                  Words or phrases that will trigger this policy during a scan.
                </div>
              </div>
            </label>
            <div className="flex">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border border-slate-300 rounded-l-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="e.g. passport, ssn (Press Enter)"
              />
              <button
                type="button"
                onClick={addKeyword}
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 rounded-r-lg transition-colors flex items-center justify-center"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2 min-h-[40px]">
              {formData.keywords.length === 0 && (
                <span className="text-sm text-slate-400 italic">No keywords added yet.</span>
              )}
              {formData.keywords.map((kw) => (
                <span
                  key={kw}
                  className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {kw}
                  <X
                    size={14}
                    className="cursor-pointer text-slate-400 hover:text-red-500 transition-colors"
                    onClick={() => removeKeyword(kw)}
                  />
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pb-4">
            <label className="block text-sm font-semibold text-slate-700">Employee Recommendation</label>
            <textarea
              required
              rows={2}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none placeholder:text-slate-400"
              placeholder="What should the employee do to comply? e.g. Remove PII before uploading."
              value={formData.recommendation}
              onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
            />
          </div>
        </div>

        {/* Right Column: Live Summary Preview */}
        <div className="lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 flex flex-col">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Rule Summary
          </h3>

          <div className="flex-1 space-y-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Name</p>
              <p className="font-medium text-slate-900 text-sm">
                {formData.name || <span className="text-slate-400 italic">Not set</span>}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Category</p>
              {formData.category ? (
                <Badge variant={formData.category === 'Privacy' ? 'default' : formData.category === 'Security' ? 'danger' : formData.category === 'Compliance' ? 'success' : formData.category === 'Confidentiality' ? 'warning' : 'outline'}>
                  {formData.category}
                </Badge>
              ) : (
                 <span className="text-slate-400 italic text-sm">Not set</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Severity</p>
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getSeverityColor(formData.severity)}`}>
                  {formData.severity}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Action</p>
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${getActionColor(formData.action)}`}>
                  {formData.action}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Keywords Configured</p>
              <p className="font-medium text-slate-900 text-3xl">
                {formData.keywords.length}
              </p>
            </div>
            
            <div className="pt-4 border-t border-slate-200">
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Status</p>
               <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.status === 'Active'}
                    onChange={(e) => setFormData({...formData, status: e.target.checked ? 'Active' : 'Inactive'})}
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  <span className="ml-3 text-sm font-medium text-slate-700">{formData.status}</span>
                </label>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 lg:flex-none">
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="flex-1 lg:flex-none shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30">
              {initialData ? "Save Changes" : "Create Rule"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
