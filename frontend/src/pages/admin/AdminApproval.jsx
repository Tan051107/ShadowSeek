import { useState } from 'react';
import SideNavigationBar from "../../components/SideNavigationBar";

function AdminApproval() {
  // 1. Initialize table data
  const [requests, setRequests] = useState([
    { id: 'REQ-1042', name: 'John Tan', initials: 'JT', tool: 'Claude Free', risk: 'MEDIUM', purpose: 'Generate customer email drafts', status: 'Pending' },
    { id: 'REQ-1041', name: 'Sarah Lim', initials: 'SL', tool: 'ChatGPT Free', risk: 'HIGH', purpose: 'Data Analysis of campaign performance', status: 'Pending' },
    { id: 'REQ-1040', name: 'Amir Rahman', initials: 'AR', tool: 'Perplexity', risk: 'MEDIUM', purpose: 'Market research summaries', status: 'Pending' },
    { id: 'REQ-1039', name: 'Priya Nair', initials: 'PN', tool: 'Company AI Assistant', risk: 'LOW', purpose: 'Draft internal policy docs', status: 'Approved' },
    { id: 'REQ-1038', name: 'Marcus Wei', initials: 'MW', tool: 'Gemini', risk: 'MEDIUM', purpose: 'Translate marketing copy', status: 'Denied' },
  ]);

  // 2. Define the function to handle approval actions
  const handleAction = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  // Return the corresponding risk level
  const getRiskStyle = (risk) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-50 text-red-700 border-red-200';
      case 'MEDIUM': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'LOW': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Return the corresponding risk dot color
  const getRiskDotColor = (risk) => {
    switch (risk) {
      case 'HIGH': return 'bg-red-500';
      case 'MEDIUM': return 'bg-orange-500';
      case 'LOW': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  // Return the corresponding status style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-50 text-orange-800';
      case 'Approved': return 'text-emerald-600 font-medium';
      case 'Denied': return 'text-red-600 font-medium';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Side Navigation Bar - Left */}
      <SideNavigationBar role="admin"/>

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* --- Header --- */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Access Approvals</h1>
            <p className="text-gray-500 text-sm mt-1">Request access to new AI tools and review pending decisions.</p>
          </div>
          <div className="avatar bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center font-bold">
            JT
          </div>
        </div>

        {/* --- Main Table Area --- */}
        <div className="p-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full">
            
            {/* Card Header (Title & Badge) */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold flex items-center text-gray-900">
                  <span className="mr-2 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                    </svg>
                  </span> 
                  Admin Approval Queue
                </h2>
                <p className="text-sm text-gray-500 mt-1">3 pending · 1 approved</p>
              </div>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-md">
                Requires attention
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-4 py-4 font-medium">Employee</th>
                    <th scope="col" className="px-4 py-4 font-medium">Tool</th>
                    <th scope="col" className="px-4 py-4 font-medium">Risk</th>
                    <th scope="col" className="px-4 py-4 font-medium">Purpose</th>
                    <th scope="col" className="px-4 py-4 font-medium">Status</th>
                    <th scope="col" className="px-4 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors bg-white">
                      {/* Employee Column */}
                      <td className="px-4 py-4 whitespace-nowrap flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-semibold text-xs shrink-0">
                          {request.initials}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{request.name}</div>
                          <div className="text-xs text-gray-400">{request.id}</div>
                        </div>
                      </td>
                      
                      {/* Tool Column */}
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {request.tool}
                      </td>
                      
                      {/* Risk Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskStyle(request.risk)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getRiskDotColor(request.risk)}`}></span>
                          {request.risk}
                        </span>
                      </td>
                      
                      {/* Purpose Column */}
                      <td className="px-4 py-4 align-top">
                        <div 
                          className="text-xs text-gray-500 max-w-[200px] xl:max-w-[250px] whitespace-normal line-clamp-2 leading-relaxed" 
                          title={request.purpose}
                        >
                          {request.purpose}
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {request.status === 'Pending' ? (
                          <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusStyle(request.status)}`}>
                            {request.status}
                          </span>
                        ) : (
                          <span className={`text-sm ${getStatusStyle(request.status)}`}>
                            {request.status}
                          </span>
                        )}
                      </td>
                      
                      {/* Action Column */}
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        {request.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleAction(request.id, 'Denied')}
                              className="inline-flex items-center px-3 py-1.5 border border-red-200 text-red-600 bg-white hover:bg-red-50 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                            >
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              Deny
                            </button>
                            <button 
                              onClick={() => handleAction(request.id, 'Approved')}
                              className="inline-flex items-center px-3 py-1.5 bg-[#10B981] hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500"
                            >
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminApproval;