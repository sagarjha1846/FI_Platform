import React from 'react';
import ReactFlow, { MiniMap, Background } from 'reactflow';

import 'reactflow/dist/style.css';
import '../css/canvas.css';

const minimapStyle = { height: 120 };

const OverviewFlow = (props) => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit } =
    props;

  return (
    <ReactFlow
      snapToGrid={true}
      snapGrid={[16, 16]}
      snapLineDragInterval={50}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={onInit}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Background color="#000" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
