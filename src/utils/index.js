import dagre from 'dagre';

const degreeGraph = new dagre.graphlib.Graph();
degreeGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  degreeGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    degreeGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    degreeGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(degreeGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = degreeGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const reduceErrorHandler = (error) => {
  return (
    (error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message) ||
    error.message ||
    error.toString() ||
    error.response.data.error.message
  );
};
export function themeChange({
  event,
  setMode,
  mode,
  nightImage,
  dayImage,
  setLogoo,
  logoo,
  light,
  dark,
}) {
  setMode(!mode);

  const htmlElement = document.querySelector('html');
  const PRIMARY =
    getComputedStyle(htmlElement).getPropertyValue('--primary-color');
  const SECONDARY =
    getComputedStyle(htmlElement).getPropertyValue('--secondary-color');
  // const PRIMARY_1 = getComputedStyle(htmlElement).getPropertyValue('--primary-color-1');
  const SECONDARY_2 = getComputedStyle(htmlElement).getPropertyValue(
    '--secondary-color-1',
  );
  const PRIMARY_2 =
    getComputedStyle(htmlElement).getPropertyValue('--primary-color-2');

  htmlElement.style.setProperty('--primary-color', SECONDARY);
  htmlElement.style.setProperty('--secondary-color', PRIMARY);
  htmlElement.style.setProperty('--primary-color-1', SECONDARY);
  // htmlElement.style.setProperty('--primary-color-1', SECONDARY);
  htmlElement.style.setProperty('--secondary-color-1', PRIMARY_2);
  htmlElement.style.setProperty('--primary-color-2', SECONDARY_2);

  // let value = logoo;

  // if (value === light) {
  //   setLogoo(dark);
  // } else {
  //   setLogoo(light);
  // }
}

export { getLayoutElements };
