import React, { useCallback } from 'react';
import ContextMenuItem from './ContextMenuItem';

const ContextMenu = ({ x, y, node, onClose }) => {
  const handleMenuItemClick = useCallback((action) => {
    console.log(`Action: ${action} on node:`, node);
    onClose();
  }, [node, onClose]);

  return (
    <div
      className="absolute bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-2xl py-1 z-[9999] min-w-44"
      style={{ 
        left: x, 
        top: y,
        transform: 'translate(-50%, -100%)', 
        marginTop: '-10px' 
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