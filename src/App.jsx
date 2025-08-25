import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './components/Canvas';
import BlockPanel from './components/BlockPanel';

const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  return (
    <ReactFlowProvider>
      <div className="w-full h-screen flex bg-transparent font-sans">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mt-3 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 py-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 shadow-inner" />
                  <div>
                    <h1 className="text-lg font-bold tracking-tight text-gray-900">Flow Builder</h1>
                    <p className="text-xs text-gray-600">Drag blocks to create connections</p>
                  </div>
                </div>
                <button
                  className="md:hidden inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow hover:shadow-md transition-all"
                  onClick={() => setIsPanelOpen((v) => !v)}
                  aria-expanded={isPanelOpen}
                  aria-controls="block-panel"
                >
                  {isPanelOpen ? 'Hide Blocks' : 'Show Blocks'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 pt-20 md:pt-24 flex-col md:flex-row gap-4 md:gap-0">
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