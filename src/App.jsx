import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  ReactFlowProvider,
  applyNodeChanges
} from 'reactflow';
import 'reactflow/dist/style.css';

// No need to explicitly import Connection/Edge types - they're inferred
const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Start' },
    position: { x: 100, y: 100 },
    draggable: true
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Process' },
    position: { x: 100, y: 200 },
    draggable: true
  },
  {
    id: '3',
    type: 'default',
    data: { label: 'End' },
    position: { x: 100, y: 300 },
    draggable: true
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((_, node) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: node.position.x + 50, y: node.position.y + 50 },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Add this handler for edge clicks
  const onEdgeClick = useCallback((event, edge) => {
    // Confirm before deletion (optional)
    if (window.confirm('Remove this connection?')) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
        onNodesChange={onNodesChange}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}