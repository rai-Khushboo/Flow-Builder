import React from 'react';

const BlockItem = ({ block, onDragStart, onClick }) => {
  return (
    <div
      className="p-3 bg-white rounded-xl border border-gray-200 cursor-move shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
      draggable
      onDragStart={(e) => onDragStart(e, block.type)}
      onClick={() => onClick(block)}
      style={{ 
        borderLeftColor: block.color, 
        borderLeftWidth: '4px'
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
           style={{ background: `linear-gradient(135deg, ${block.color}1a, transparent 60%)` }} />
      <div className="flex items-center justify-between relative">
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 tracking-tight">
            {block.label}
          </div>
          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
            {block.description}
          </div>
        </div>
        <div 
          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: block.color }}
        />
      </div>
      
      <div className="mt-2 flex items-center text-[11px] text-gray-500">
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






