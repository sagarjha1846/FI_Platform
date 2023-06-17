import React, { useState } from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import { ImCheckboxChecked } from 'react-icons/im';
import { Menu } from 'react-pro-sidebar';
import { MarkerType } from 'reactflow';

import '../css/nodeList.css';
import Paginate from './Paginate';

const NodeList = (props) => {
  const {
    nodes,
    nodeList,
    setNodes,
    setEdges,
    setIsChecked,
    isChecked,
    activeMenu,
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const setNodeInCanvas = (data) => {
    const targetId = data;
    const isPrimaryNode = nodes.find((node) => node.data.label === data);
    if (isPrimaryNode?.id !== '1') {
      setIsChecked((prev) => ({ ...prev, [data]: !isChecked[data] }));

      setNodes((prev) =>
        isChecked[data]
          ? [...prev.filter((info) => info.data.label !== data)]
          : [
              ...prev,
              {
                id: data ? data : 'no record',
                type: 'MyCustomNode',
                data: { label: data ? data : undefined },
                position: {
                  x: Math.floor(Math.random() * 400),
                  y: Math.floor(Math.random() * 400),
                },
              },
            ],
      );

      setEdges((prev) =>
        isChecked[data]
          ? [...prev.filter((info) => info.target !== targetId)]
          : [
              ...prev,
              {
                source: nodeList?.query,
                target: data ? data : 'no record',
                type: 'floating',
                markerEnd: { type: MarkerType.Arrow },
              },
            ],
      );
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (
      currentPage !==
      Math.ceil(nodeList.data[activeMenu]?.length / postsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const slicedData = nodeList.data[activeMenu]?.slice(
    indexOfFirstPost,
    indexOfFirstPost + postsPerPage,
  );
  return (
    <Menu className="w-full">
      {slicedData &&
        slicedData?.map((node, index) => (
          <div className="node-list">
            <ul className="listItem p-1" key={index}>
              <li className="listName line-clamp-2">{node || '-'}</li>
              {isChecked[node] ? (
                <ImCheckboxChecked
                  size={'25px'}
                  onClick={() => setNodeInCanvas(node)}
                />
              ) : (
                <AiFillPlusSquare
                  size={'25px'}
                  onClick={() => setNodeInCanvas(node)}
                />
              )}
            </ul>
          </div>
        ))}
      <div className="grid place-content-center ">
        <Paginate
          postsPerPage={postsPerPage}
          previousPage={previousPage}
          nextPage={nextPage}
          totalPosts={nodeList.data[activeMenu]?.length}
          paginate={paginate}
        />
      </div>
    </Menu>
  );
};

export default NodeList;
