import React, { useState, useEffect } from 'react';
import { Controls, Background, MiniMap } from 'reactflow';

const CanvasControls = ({ nodes, onUndo, onRedo, canUndo, canRedo }) => {
  const [isMinimapVisible, setIsMinimapVisible] = useState(false);

  const toggleMinimap = () => {
    setIsMinimapVisible(!isMinimapVisible);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'm' || event.key === 'M') {
        // Only toggle if not typing in an input field
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          event.preventDefault();
          toggleMinimap();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMinimapVisible]);

  return (
    <>
      <Controls className="bg-white border border-gray-300 rounded-lg shadow-md" />
      <Background 
        color="#e5e7eb" 
        gap={20} 
        size={1}
        variant="dots"
      />
      
      {/* Minimap Toggle Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <button
          onClick={toggleMinimap}
          className="bg-white border border-gray-300 rounded-lg shadow-md p-2 hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          title={`${isMinimapVisible ? "Hide" : "Show"} minimap (M)`}
        >
          {isMinimapVisible ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Undo/Redo Buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`bg-white border border-gray-300 rounded-lg shadow-md p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${canUndo ? 'hover:shadow-lg text-gray-700 hover:text-gray-900' : 'opacity-50 cursor-not-allowed text-gray-400'}`}
          title="Undo (Ctrl/Cmd+Z)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h5a7 7 0 017 7v0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l4-4M3 7l4 4" />
          </svg>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`bg-white border border-gray-300 rounded-lg shadow-md p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${canRedo ? 'hover:shadow-lg text-gray-700 hover:text-gray-900' : 'opacity-50 cursor-not-allowed text-gray-400'}`}
          title="Redo (Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7h-5a7 7 0 00-7 7v0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7l-4-4M21 7l-4 4" />
          </svg>
        </button>
      </div>
      
      {/* Minimap - Conditionally Rendered */}
      {isMinimapVisible && (
        <MiniMap 
          className="bg-gray-50 border border-gray-300 rounded-lg"
          nodeColor={() => 'transparent'}
          nodeStrokeColor={(node) => node?.data?.color || '#9CA3AF'}
          nodeStrokeWidth={1.5}
        />
      )}
    </>
  );
};

export default CanvasControls;
