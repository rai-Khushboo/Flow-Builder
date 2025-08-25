// ReactFlow config
export const REACTFLOW_CONFIG = {
  connectionMode: 'loose',
  snapToGrid: true,
  snapGrid: [15, 15],
  defaultEdgeOptions: {
    type: 'smoothstep',
    markerEnd: {
      type: 'arrowclosed',
    },
  },
  attributionPosition: 'bottom-left',
  proOptions: { hideAttribution: true },
};

export const EDGE_STYLES = {
  type: 'smoothstep',
  style: { stroke: '#3B82F6', strokeWidth: 2 },
  markerEnd: {
    type: 'arrowclosed',
    color: '#3B82F6',
  },
};

// Handle styling 
export const HANDLE_STYLES = {
  width: 12,
  height: 12,
  borderRadius: '50%',
  border: '2px solid white',
};

// Connection rules
export const CONNECTION_RULES = {
  allowedSourceTypes: ['Block A'],
  allowedTargetTypes: ['Block B'],
  allowedHandles: ['left', 'right'],
};





