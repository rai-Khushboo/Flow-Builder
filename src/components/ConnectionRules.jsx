import React from 'react';

const ConnectionRules = () => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-800">Connection Rules</h4>
          <p className="text-xs text-blue-600">Follow these guidelines for valid connections</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center p-2 bg-white rounded-lg border border-blue-100">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-700">Block A</span>
            <span className="text-xs text-gray-500 mx-2">→</span>
            <span className="text-xs font-medium text-gray-700">Block B</span>
            
          </div>
        </div>
        
        <div className="flex items-center p-2 bg-white rounded-lg border border-blue-100">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-xs font-medium text-gray-700">Block B</span>
            <span className="text-xs text-gray-500 mx-2">→</span>
            <span className="text-xs font-medium text-gray-700">Block A</span>
            
          </div>
        </div>
      </div>
         
    </div>
  );
};

export default ConnectionRules;
