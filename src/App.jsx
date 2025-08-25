import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Canvas from './components/Canvas';
import BlockPanel from './components/BlockPanel';

const App = () => {
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 pt-16">
          <Canvas />
          <BlockPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default App;