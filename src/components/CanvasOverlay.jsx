import React from 'react';

const CanvasOverlay = ({ nodes }) => {
  if (nodes.length > 0) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative max-w-md w-[90%] text-center">
        <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
          <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <span aria-hidden>🔗</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 tracking-tight">
            To Start
          </h3>
          <div className="mx-auto mb-3 h-1 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
          <p className="text-gray-600 text-sm">
            Drag blocks from the right panel onto this canvas to begin building your flow.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Connect <span className="font-medium text-gray-700">Block A</span> → <span className="font-medium text-gray-700">Block B</span>
          </p>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex flex-col items-center gap-1 text-gray-500 text-xs">
              <p>
                💡 Press <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] shadow-sm">M</kbd> to toggle minimap
              </p>
              <p>🖱️ Right-click on any block to open the context menu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasOverlay;
