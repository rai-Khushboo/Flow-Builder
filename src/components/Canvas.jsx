import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

import CustomBlockNode from './CustomBlockNode';
import CanvasControls from './CanvasControls';
import CanvasOverlay from './CanvasOverlay';
import ContextMenu from './ContextMenu';

import { REACTFLOW_CONFIG, EDGE_STYLES, CONNECTION_RULES } from '../utils/constants';

import blocksData from '../data/blocks.json';

const nodeTypes = {
  customBlock: CustomBlockNode,
};

const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  // Undo/Redo availability state (for UI updates)
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  // History management refs
  const pastRef = useRef([]);
  const futureRef = useRef([]);
  const isApplyingHistory = useRef(false);
  const hasInitializedRef = useRef(false);
  const prevSnapshotRef = useRef(JSON.stringify({ nodes: [], edges: [] }));

  // Connection Logic Hook
  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find(node => node.id === params.source);
    const targetNode = nodes.find(node => node.id === params.target);
    
    // console.log('Connection attempt:', { 
    //   sourceNode: sourceNode?.data?.type, 
    //   targetNode: targetNode?.data?.type,
    //   sourceHandle: params.sourceHandle,
    //   targetHandle: params.targetHandle
    // });
    
    //  Block A → Block B connection
    const isValidSource = CONNECTION_RULES.allowedSourceTypes.includes(sourceNode?.data?.type);
    const isValidTarget = CONNECTION_RULES.allowedTargetTypes.includes(targetNode?.data?.type);
    const isValidSourceHandle = CONNECTION_RULES.allowedHandles.includes(params.sourceHandle);
    const isValidTargetHandle = CONNECTION_RULES.allowedHandles.includes(params.targetHandle);
    
    if (isValidSource && isValidTarget && isValidSourceHandle && isValidTargetHandle) {
      const newEdge = {
        ...params,
        ...EDGE_STYLES,
      };
      setEdges((eds) => addEdge(newEdge, eds));
      console.log('Connection successful!');
    } else {
      console.log('Connection rejected - only Block A (output) → Block B (input) allowed');
    }
  }, [nodes, setEdges]);

  const isValidConnection = useCallback((connection) => {
    const sourceNode = nodes.find(node => node.id === connection.source);
    const targetNode = nodes.find(node => node.id === connection.target);
    
    console.log('Validating connection:', { 
      source: sourceNode?.data?.type, 
      target: targetNode?.data?.type,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle
    });
    
    // A -> B connection
    const isValidSource = CONNECTION_RULES.allowedSourceTypes.includes(sourceNode?.data?.type);
    const isValidTarget = CONNECTION_RULES.allowedTargetTypes.includes(targetNode?.data?.type);
    const isValidSourceHandle = CONNECTION_RULES.allowedHandles.includes(connection.sourceHandle);
    const isValidTargetHandle = CONNECTION_RULES.allowedHandles.includes(connection.targetHandle);
    
    const isValid = isValidSource && isValidTarget && isValidSourceHandle && isValidTargetHandle;
    // console.log('Connection valid:', isValid);
    
    return isValid;
  }, [nodes]);

  const onConnectStart = useCallback((event, { nodeId, handleId, handleType }) => {
    if (nodeId) {
      const node = nodes.find(n => n.id === nodeId);
      if (node?.data?.type === 'Block B') {
        console.log('Connection start blocked - Block B cannot initiate connections');
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }, [nodes]);

  // Drag and Drop Logic Hook
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const blockInfo = blocksData.blocks.find(block => block.type === type);
      const newNode = {
        id: `${blockInfo.id}-${Date.now()}`,
        type: 'customBlock',
        position,
        data: { 
          label: blockInfo.label,
          type: blockInfo.type,
          color: blockInfo.color,
          description: blockInfo.description
        },
        dragHandle: '.drag-handle',
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Context Menu Logic Hook 
  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Context menu triggered:', { 
      node: node?.data?.type, 
      position: { x: event.clientX, y: event.clientY } 
    });
    
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      node,
    });
  }, []);

  const onPaneClick = useCallback(() => {
    if (contextMenu) {
      console.log('Closing context menu via pane click');
      setContextMenu(null);
    }
  }, [contextMenu]);

  const closeContextMenu = useCallback(() => {
    console.log('Closing context menu');
    setContextMenu(null);
  }, []);

  // Close context menu on escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setContextMenu(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  //undo redo
  useEffect(() => {
    if (isApplyingHistory.current) {
      isApplyingHistory.current = false;
      return;
    }
    const currentSnapshot = JSON.stringify({ nodes, edges });
    if (!hasInitializedRef.current) {
      if (prevSnapshotRef.current !== currentSnapshot) {
        pastRef.current.push(prevSnapshotRef.current);
        prevSnapshotRef.current = currentSnapshot;
        hasInitializedRef.current = true;
        futureRef.current = [];
      }
    } else if (prevSnapshotRef.current !== currentSnapshot) {
      pastRef.current.push(prevSnapshotRef.current);
      prevSnapshotRef.current = currentSnapshot;
      futureRef.current = [];
    }
    
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (pastRef.current.length === 0) return;
    const currentSnapshot = prevSnapshotRef.current;
    const previousSnapshot = pastRef.current.pop();
    if (!previousSnapshot) return;
    futureRef.current.push(currentSnapshot);
    prevSnapshotRef.current = previousSnapshot;
    const { nodes: prevNodes, edges: prevEdges } = JSON.parse(previousSnapshot);
    isApplyingHistory.current = true;
    setNodes(prevNodes);
    setEdges(prevEdges);
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, [setNodes, setEdges]);

  const redo = useCallback(() => {
    if (futureRef.current.length === 0) return;
    const currentSnapshot = prevSnapshotRef.current;
    const nextSnapshot = futureRef.current.pop();
    if (!nextSnapshot) return;
    pastRef.current.push(currentSnapshot);
    prevSnapshotRef.current = nextSnapshot;
    const { nodes: nextNodes, edges: nextEdges } = JSON.parse(nextSnapshot);
    isApplyingHistory.current = true;
    setNodes(nextNodes);
    setEdges(nextEdges);
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, [setNodes, setEdges]);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    // Reset graph
    setNodes([]);
    setEdges([]);
    // Reset history tracking
    pastRef.current = [];
    futureRef.current = [];
    prevSnapshotRef.current = JSON.stringify({ nodes: [], edges: [] });
    hasInitializedRef.current = false;
    setCanUndo(false);
    setCanRedo(false);
  }, [setNodes, setEdges]);

  // Keyboard shortcuts for undo , redo
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isInput = ['INPUT', 'TEXTAREA'].includes(event.target.tagName) || event.target.isContentEditable;
      if (isInput) return;
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;
      if (ctrlOrCmd && event.key.toLowerCase() === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if ((ctrlOrCmd && event.key.toLowerCase() === 'y') || (ctrlOrCmd && event.shiftKey && event.key.toLowerCase() === 'z')) {
        event.preventDefault();
        redo();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] md:h-full relative bg-gray-100">
      <div className="w-full h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          isValidConnection={isValidConnection}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          {...REACTFLOW_CONFIG}
          fitView
        >
          <CanvasControls 
            nodes={nodes} 
            onUndo={undo} 
            onRedo={redo} 
            canUndo={canUndo} 
            canRedo={canRedo}
            onClear={clearCanvas}
          />
        </ReactFlow>
      </div>
      
      <CanvasOverlay nodes={nodes} />
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextMenu.node}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
};

export default Canvas;