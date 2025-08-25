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
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4 h-full overflow-y-auto">
      <div className="sticky top-0 bg-gray-50 pb-4">
        <h3 className="text-lg font-semibold text-gray-800">Available Blocks</h3>
        <p className="text-xs text-gray-500 mt-1">Drag blocks to canvas</p>
      </div>
      
      <div className="space-y-3">
        {blocksData.blocks.map((block) => (
          <BlockItem
            key={block.id}
            block={block}
            onDragStart={onDragStart}
            onClick={handleBlockClick}
          />
        ))}
      </div>
      
      <ConnectionRules />
    </div>
  );
};

export default BlockPanel;