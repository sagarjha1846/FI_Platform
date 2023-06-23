import React, { useState } from 'react';
import ReactFlow, { MiniMap, Background } from 'reactflow';

import 'reactflow/dist/style.css';
import '../css/canvas.css';
import { useEffect } from 'react';

const minimapStyle = { height: 120 };

const OverviewFlow = (props) => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onInit,
    nodeInfoList,
    setNodeInfo,
  } = props;

  const [nodeClicked, setNodeClicked] = useState('');

  useEffect(() => {
    const node =
      nodeInfoList && nodeInfoList.filter((el) => el.query === nodeClicked);
    if (node?.length === 1) {
      setNodeInfo(node[0]);
    }
  }, [nodeClicked, nodeInfoList, setNodeInfo]);
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
      onClick={(e) =>
        setNodeClicked(e.target.attributes.getNamedItem('data-id').value)
      }
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Background color="#000" gap={16} />
    </ReactFlow>
  );
};

export default OverviewFlow;
