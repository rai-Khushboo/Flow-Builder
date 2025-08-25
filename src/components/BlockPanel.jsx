import React, { useCallback } from 'react';
import blocksData from '../data/blocks.json';
import BlockItem from './BlockItem';
import ConnectionRules from './ConnectionRules';

const BlockPanel = () => {
  // Drag and Drop Logic (inline for easier understanding)
  const onDragStart = useCallback((event, blockType) => {
    event.dataTransfer.setData('application/reactflow', blockType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleBlockClick = useCallback((block) => {
    console.log('Block clicked:', block);
  }, []);

  return (
    <div className="w-full md:w-72 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 border-t md:border-t-0 md:border-l border-gray-200 h-64 md:h-full overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 px-4 py-3">
        <h3 className="text-sm font-semibold tracking-wide text-gray-900">Available Blocks</h3>
        <p className="text-xs text-gray-500">Drag blocks to canvas</p>
      </div>
      
      <div className="p-4 space-y-3">
        {blocksData.blocks.map((block) => (
          <BlockItem
            key={block.id}
            block={block}
            onDragStart={onDragStart}
            onClick={handleBlockClick}
          />
        ))}
      </div>
      
      <div className="px-4 pb-4">
        <ConnectionRules />
      </div>
    </div>
  );
};

export default BlockPanel;