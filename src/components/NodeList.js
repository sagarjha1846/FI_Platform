import React, { useEffect, useState } from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import { ImCheckboxChecked } from 'react-icons/im';
import { MarkerType } from 'reactflow';

import '../css/nodeList.css';
import { Pagination } from 'antd';

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
  const [postsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

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

  const slicedData =
    nodeList.query !== ''
      ? activeMenu && nodeList.data[activeMenu] != null
        ? nodeList.data[activeMenu]?.slice(
            indexOfFirstPost,
            indexOfFirstPost + postsPerPage,
          )
        : []
      : [];

  const itemRender = (_, type) => {
    if (type === 'prev') {
      return <span>Previous</span>;
    }
    if (type === 'next') {
      return <span>Next</span>;
    }
  };

  useEffect(() => {
    if (activeMenu) {
      setCurrentPage(1);
    }
  }, [activeMenu]);

  const handlePagination = (e) => {
    setCurrentPage(e);
  };

  return (
    <div className="overflow-hidden w-[256px] flex flex-col">
      <div className="w-full ">
        <div className="flex w-full flex-col">
          {slicedData &&
            slicedData.map((el) => (
              <div className="flex justify-between p-2 ">
                <div className="w-[80%] break-all text-left">{el}</div>
                <div className=" cursor-pointer">
                  {isChecked[el] ? (
                    <ImCheckboxChecked
                      size={'25px'}
                      onClick={() => setNodeInCanvas(el)}
                    />
                  ) : (
                    <AiFillPlusSquare
                      size={'25px'}
                      onClick={() => setNodeInCanvas(el)}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="grid place-content-center ">
        {activeMenu && nodeList.query !== '' && nodeList.data[activeMenu] ? (
          <Pagination
            simple
            current={currentPage}
            total={
              activeMenu && nodeList.data[activeMenu]
                ? nodeList.data[activeMenu].length
                : 0
            }
            itemRender={itemRender}
            defaultPageSize={postsPerPage}
            showSizeChanger={false}
            showQuickJumper={false}
            onChange={handlePagination}
          />
        ) : (
          'No Data To View'
        )}
      </div>
    </div>
  );
};

export default NodeList;
