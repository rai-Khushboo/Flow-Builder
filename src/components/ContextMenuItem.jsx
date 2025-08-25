import React from 'react';

const ContextMenuItem = ({ label, onClick, isDivider = false, className = "" }) => {
  if (isDivider) {
    return <div className="border-t border-gray-200 my-1" />;
  }

  return (
    <div 
      className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 hover:bg-gray-100 rounded-lg mx-1 ${className}`}
      onClick={onClick}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {label}
    </div>
  );
};

export default ContextMenuItem;
