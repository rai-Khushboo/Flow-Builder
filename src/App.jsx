import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './components/Canvas';
import BlockPanel from './components/BlockPanel';

const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  return (
    <ReactFlowProvider>
      <div className="w-full h-screen flex bg-gray-100 font-sans">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-6 py-3 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Flow Builder</h1>
              <p className="text-sm text-gray-600">
                Drag blocks to create connections 
              </p>
            </div>
            <button
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300"
              onClick={() => setIsPanelOpen((v) => !v)}
              aria-expanded={isPanelOpen}
              aria-controls="block-panel"
            >
              {isPanelOpen ? 'Hide Blocks' : 'Show Blocks'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 pt-16 flex-col md:flex-row">
          <Canvas />
          <div id="block-panel" className={`md:block ${isPanelOpen ? 'block' : 'hidden'}`}>
            <BlockPanel />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default App;