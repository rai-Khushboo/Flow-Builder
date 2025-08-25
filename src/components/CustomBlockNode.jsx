import React from 'react';
import { Handle, Position } from 'reactflow';
import { HANDLE_STYLES } from '../utils/constants';

const CustomBlockNode = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 bg-white shadow-md min-w-28 text-center font-medium transition-all duration-200 relative ${
        selected ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-300 hover:shadow-lg'
      }`}
      style={{ borderColor: selected ? '#3B82F6' : data.color }}
    >
      <div className="text-sm text-gray-700 font-semibold">{data.label}</div>
      <div className="text-xs text-gray-500 mt-1">{data.type}</div>
      
      {/* Left Handle - for Block A: can be source, for Block B: can be target */}
      <Handle
        type={data.type === 'Block A' ? 'source' : 'target'}
        position={Position.Left}
        id="left"
        connectable={data.type === 'Block A'}
        onMouseDown={data.type === 'Block B' ? (e) => e.preventDefault() : undefined}
        style={{
          background: data.color,
          ...HANDLE_STYLES,
          cursor: data.type === 'Block A' ? 'crosshair' : 'default',
          pointerEvents: data.type === 'Block B' ? 'none' : 'auto',
        }}
      />
      
      {/* Right Handle - for Block A: can be source, for Block B: can be target */}
      <Handle
        type={data.type === 'Block A' ? 'source' : 'target'}
        position={Position.Right}
        id="right"
        connectable={data.type === 'Block A'}
        onMouseDown={data.type === 'Block B' ? (e) => e.preventDefault() : undefined}
        style={{
          background: data.color,
          ...HANDLE_STYLES,
          cursor: data.type === 'Block A' ? 'crosshair' : 'default',
          pointerEvents: data.type === 'Block B' ? 'none' : 'auto',
        }}
      />
    </div>
  );
};

export default CustomBlockNode;
