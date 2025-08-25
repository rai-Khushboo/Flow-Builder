import React from 'react';

const CanvasOverlay = ({ nodes }) => {
  if (nodes.length > 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-md text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          To Start
        </h3>
        <p className="text-gray-600 text-sm">
          Drag blocks from the right panel onto this canvas to begin building your flow.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Connect Block A → Block B 
        </p>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-gray-400 text-xs">
            💡 Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">M</kbd> to toggle minimap
          </p>
          <p className="text-gray-400 text-xs mt-1">
            🖱️ Right-click on any block to see context menu
          </p>
        </div>
      </div>
    </div>
  );
};

export default CanvasOverlay;
