import React from 'react';
import { Handle, Position } from 'reactflow';
import { HANDLE_STYLES } from '../utils/constants';

const CustomBlockNode = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-3 rounded-xl border-2 bg-white/95 backdrop-blur shadow-md min-w-28 text-center font-medium transition-all duration-200 relative ${
        selected ? 'shadow-lg ring-4 ring-gray-100 scale-[1.03]' : 'border-gray-200 hover:shadow-lg'
      }`}
      style={{ borderColor: data.color }}
    >
      <div className="drag-handle absolute -top-2 left-1/2 -translate-x-1/2 select-none" title="Drag">
        <div className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 shadow-sm">
          <svg className="w-3 h-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <circle cx="6" cy="6" r="1"/>
            <circle cx="10" cy="6" r="1"/>
            <circle cx="14" cy="6" r="1"/>
            <circle cx="6" cy="10" r="1"/>
            <circle cx="10" cy="10" r="1"/>
            <circle cx="14" cy="10" r="1"/>
          </svg>
        </div>
      </div>
      <div className="text-sm text-gray-800 font-semibold tracking-tight">{data.label}</div>
      <div className="text-[11px] text-gray-500 mt-1">{data.type}</div>
      
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
