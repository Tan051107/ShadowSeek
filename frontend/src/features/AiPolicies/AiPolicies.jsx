import { useState } from 'react';
import SideNavigationBar from "../../components/SideNavigationBar";
import { Plus } from 'lucide-react';
import { PolicyTable } from './components/PolicyTable';
import { PolicyModal } from './components/PolicyModal';
import { DeleteModal } from './components/DeleteModal';
import { Button } from '../../components/common/Button';
import initialPolicies from '../GovernanceCore/data/policies';
import policyAnalysis from '../GovernanceCore/data/policyAnalysis';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function PolicyManagement() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentPolicy, setCurrentPolicy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    setCurrentPolicy(null);
    setIsModalOpen(true);
  };

  const handleEdit = (policy) => {
    setCurrentPolicy(policy);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (policy) => {
    setCurrentPolicy(policy);
    setIsDeleteOpen(true);
  };

  const handleSavePolicy = (savedPolicy) => {
    if (currentPolicy) {
      setPolicies(policies.map(p => p.id === savedPolicy.id ? savedPolicy : p));
    } else {
      setPolicies([...policies, savedPolicy]);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setPolicies(policies.filter(p => p.id !== currentPolicy.id));
    setIsDeleteOpen(false);
  };

  const filteredPolicies = policies.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <SideNavigationBar role="admin" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Policy Management</h1>
          <p className="text-sm text-gray-500">Manage data protection rules for employee AI interactions.</p>
        </div>
        <Button variant="primary" onClick={handleAdd} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Policy</span>
        </Button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search policies or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 1. Category Confusion */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Most Confusing Governance Categories</CardTitle>
            <p className="text-sm text-gray-500">Policies employees request clarification for most frequently.</p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={policyAnalysis.confusionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="requests" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 2. Trigger Frequency */}
        <Card className="border-gray-200/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Policy Trigger Frequency</CardTitle>
            <p className="text-sm text-gray-500">The governance rules triggered most often by prompts.</p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={policyAnalysis.triggerFrequency} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={140} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="triggers" fill="#f59e0b" radius={[0, 4, 4, 0]} maxBarSize={24}>
                    {policyAnalysis.triggerFrequency.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 2 ? '#f43f5e' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <PolicyTable 
        policies={filteredPolicies} 
        onEdit={handleEdit} 
        onDelete={handleDeleteClick} 
      />

      <PolicyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePolicy}
        initialData={currentPolicy}
      />

      <DeleteModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        policyName={currentPolicy?.name}
      />
        </div>
      </div>
    </div>
  );
}

