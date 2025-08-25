import React, { useCallback } from 'react';
import ContextMenuItem from './ContextMenuItem';

const ContextMenu = ({ x, y, node, onClose }) => {
  // Context Menu Logic (inline for easier understanding)
  const handleMenuItemClick = useCallback((action) => {
    console.log(`Action: ${action} on node:`, node);
    onClose();
  }, [node, onClose]);

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl py-1 z-[9999] min-w-40"
      style={{ 
        left: x, 
        top: y,
        transform: 'translate(-50%, -100%)', // Center horizontally and position above cursor
        marginTop: '-10px' // Small offset for better positioning
      }}
    >
      <ContextMenuItem
        label="Hello World"
        onClick={() => handleMenuItemClick('hello-world')}
        className="text-gray-700 hover:text-gray-900"
      />
      <ContextMenuItem isDivider />
      <ContextMenuItem
        label={`Block Info: ${node?.data?.type || 'Unknown'}`}
        onClick={() => handleMenuItemClick('block-info')}
        className="text-gray-500 hover:text-gray-700"
      />
    </div>
  );
};

export default ContextMenu;