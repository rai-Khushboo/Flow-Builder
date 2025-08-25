import React from 'react';

const BlockItem = ({ block, onDragStart, onClick }) => {
  return (
    <div
      className="p-3 bg-white rounded-lg border border-gray-300 cursor-move shadow-sm hover:shadow-md transition-all duration-200 group"
      draggable
      onDragStart={(e) => onDragStart(e, block.type)}
      onClick={() => onClick(block)}
      style={{ 
        borderLeftColor: block.color, 
        borderLeftWidth: '4px'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {block.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {block.description}
          </div>
        </div>
        <div 
          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: block.color }}
        />
      </div>
      
      <div className="mt-2 flex items-center text-xs text-gray-400">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
        Drag to use
      </div>
    </div>
  );
};

export default BlockItem;





