import { useState } from 'react';
import SideNavigationBar from "../../components/SideNavigationBar";

function EmployeeApproval() {
  // Define form status
  const [formData, setFormData] = useState({
    aiTool: 'Claude Free',
    purpose: '',
    dataType: 'Marketing information',
    justification: ''
  });

  //1. Control the on/off state of a custom drop-down menu
  const [isAiToolOpen, setIsAiToolOpen] = useState(false);
  const [isDataTypeOpen, setIsDataTypeOpen] = useState(false);

  // Controlwhether the "Submission Successful" screen is displayed
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Define the options for the dropdown menus for easy rendering
  const aiToolsList = ['Claude Free', 'ChatGPT Free', 'Gemini', 'Perplexity'];
  const dataTypesList = ['Marketing information', 'Public information', 'Internal (non-sensitive)', 'Confidential'];
  
  // 2. Handle changes in standard input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    setIsSubmitted(true); // Display success interface after successful submission
  };

  // Handle the "Submit another" button, reset the form and return to the initial interface
  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      aiTool: 'Claude Free',
      purpose: '',
      dataType: 'Marketing information',
      justification: ''
    });
  }

  // Based on DataType return suggestion message
  const getSuggestionMessage = (dataType) => {
    switch (dataType) {
      case 'Marketing information':
        return (
          <>Suggested alternative: <strong className="font-bold">Company AI Assistant</strong> can handle marketing drafts with lower risk.</>
        );
      case 'Public information':
        return (
          <>Suggested alternative: <strong className="font-bold">Approved Public LLMs</strong> are safe for public data, but ensure no PII is included.</>
        );
      case 'Internal (non-sensitive)':
        return (
          <>Suggested alternative: <strong className="font-bold">Enterprise Copilot</strong> is recommended for internal docs to maintain governance.</>
        );
      case 'Confidential':
        return (
          <>High Risk: For confidential data, strictly use the <strong className="font-bold">Secure Internal Sandbox</strong> to prevent data leaks.</>
        );
      default:
        return (
          <>Please select a data type to view safe AI alternatives.</>
        );
    }
  };

  // Extract common input field styles
  const inputStyles = "w-full border border-gray-300 rounded-lg p-2.5 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#1F6899] focus:border-[#1F6899] transition-all bg-white text-gray-900";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SideNavigationBar role="employee"/>

      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* --- Header --- */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Access Approvals</h1>
            <p className="text-gray-500 text-sm mt-1">Request access to new AI tools.</p>
          </div>
          <div className="avatar bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center font-bold">
            JT
          </div>
        </div>

        {/* --- Form Card Area --- */}
        <div className="p-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm w-full">
            
            <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-900">
              <span className="mr-2 text-[#1F6899]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </span> 
              New Access Request
            </h2>
            <p className="text-sm text-gray-500 mb-6">Submit for compliance review.</p>

            {/* Core logic: Conditional rendering */}
            {isSubmitted ? (
              
              /* --- Successful submission UI --- */
              <div className="bg-[#F0FDF4] border border-green-200 rounded-xl py-12 px-6 flex flex-col items-center justify-center text-center mt-2">
                {/* Green checkmark icon */}
                <div className="mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Request submitted</h3>
                
                <p className="text-sm text-gray-500 mb-6">
                  Ticket <strong className="font-semibold text-gray-700">REQ-1043</strong> created. Expect a decision within 1 business day.
                </p>
                
                <button 
                  onClick={handleReset}
                  className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-5 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                >
                  Submit another
                </button>
              </div>

            ) : (

            <form onSubmit={handleSubmit}>
            {/* AI Tool custom drop-down menu */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium mb-1 text-gray-900">AI Tool</label>
                <div 
                  className={`${inputStyles} cursor-pointer flex justify-between items-center ${isAiToolOpen ? 'border-[#1F6899] ring-1 ring-[#1F6899]' : ''}`}
                  onClick={() => {
                    setIsAiToolOpen(!isAiToolOpen);
                    setIsDataTypeOpen(false); 
                  }}
                >
                  <span>{formData.aiTool}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                
                {isAiToolOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {aiToolsList.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, aiTool: option });
                          setIsAiToolOpen(false);
                        }}
                        // Hover
                        className="px-4 py-2.5 cursor-pointer flex justify-between items-center transition-colors text-gray-700 hover:bg-[#E5F1F8]"
                      >
                        <span>{option}</span>
                        {/* Display a checkmark icon */}
                        {formData.aiTool === option && (
                          <svg className="w-5 h-5 text-[#1F6899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Purpose input box*/}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-900">Purpose</label>
                <input 
                  type="text" 
                  name="purpose"
                  placeholder="Generate customer email drafts"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className={inputStyles}
                />
              </div>

              {/* Data Type custom drop-down menu */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium mb-1 text-gray-900">Data Type</label>
                <div 
                  className={`${inputStyles} cursor-pointer flex justify-between items-center ${isDataTypeOpen ? 'border-[#1F6899] ring-1 ring-[#1F6899]' : ''}`}
                  onClick={() => {
                    setIsDataTypeOpen(!isDataTypeOpen);
                    setIsAiToolOpen(false);
                  }}
                >
                  <span>{formData.dataType}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                
                {isDataTypeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    {dataTypesList.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, dataType: option });
                          setIsDataTypeOpen(false);
                        }}
                        // Hover
                        className="px-4 py-2.5 cursor-pointer flex justify-between items-center transition-colors text-gray-700 hover:bg-[#E5F1F8]"
                      >
                        <span>{option}</span>
                        {/* Display a checkmark icon */}
                        {formData.dataType === option && (
                          <svg className="w-5 h-5 text-[#1F6899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Business Justification input box */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 text-gray-900">Business Justification</label>
                <textarea 
                  name="justification"
                  placeholder="Why is this tool necessary? What alternatives were considered?"
                  value={formData.justification}
                  onChange={handleInputChange}
                  className={`${inputStyles} h-24 resize-none`}
                ></textarea>
              </div>

              {/* Suggestion Message */}
              <div className="bg-[#FFF4E5] border border-orange-200 text-black p-3 rounded-lg mb-6 flex items-start shadow-sm">
                <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
                <p className="text-sm leading-relaxed">
                  {getSuggestionMessage(formData.dataType)}
                </p>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#1F6899] text-white font-medium py-2.5 px-4 rounded-lg shadow-sm hover:bg-[#164e73] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F6899]"
              >
                Submit Request
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeApproval;