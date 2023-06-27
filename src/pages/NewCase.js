/* eslint-disable no-unused-vars */
import React, { createRef, useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { ReactFlowProvider, addEdge } from 'reactflow';
import { toPng } from 'html-to-image';
import Footer from '../components/Footer-newcase';
import CanvasArea from '../components/CanvasArea';
import NodeList from '../components/NodeList';
import SideNav from '../components/Sidebar';
import Tool from '../components/Tool';
import '../css/newcase.css';
import { getLayoutElements } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlass } from 'react-loader-spinner';

import { createFileName, useScreenshot } from 'use-react-screenshot';
import Ransomware from './Ransomware';
import { useSelector } from 'react-redux';
import PopUp from '../components/PopUp';

import Profile from '../components/Profile';

// import { useEffect } from 'react';

const NewCase = ({
  setEdges,
  setNodes,
  setCanvasFunc,
  nodes,
  edges,
  setActiveMenu,
  nodeInfo,
  searchRef,
  activeMenu,
  isChecked,
  setIsChecked,
  isLoading,
  setNodeInfo,
  nodeInfoList,
  onNodesChange,
  onEdgesChange,
  canvasFunc,
  mode,
}) => {
  const location = useLocation();

  const ref = createRef(null);
  const [_, takeScreenshot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  });

  const navigate = useNavigate();
  // const searchRef = useRef();
  // const [nodeInfo, setNodeInfo] = useState({ query: '', data: null });
  // const [nodes, setNodes, onNodesChange] = useNodesState([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [canvasFunc, setCanvasFunc] = useState();
  // const [isChecked, setIsChecked] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [search, setSearch] = useState('');
  // const [activeMenu, setActiveMenu] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  // const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('');
  // const [nodeInfoList, setNodeInfoList] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const [caseName, setCaseName] = useState('');

  useEffect(() => {
    if (location?.state?.values?.nodeName) {
      setCaseName(location?.state?.values?.nodeName);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const { token } = useSelector((state) => state.auth);
  const download = (image, { name = 'img', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const getImage = () => takeScreenshot(ref.current).then(download);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const onInit = (reactFlowInstance) => setCanvasFunc(reactFlowInstance);

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutNodes, edges: layoutEdges } = getLayoutElements(
        nodes,
        edges,
        direction,
      );

      setNodes([...layoutNodes]);
      setEdges([...layoutEdges]);
    },
    [nodes, edges, setNodes, setEdges],
  );
  const handleFullScreen = () => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen();
      } else if (ref.current.msRequestFullscreen) {
        ref.current.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>FridayIntel-NewCase</title>
        <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
      </Helmet>

      {/* PROFILE HOVER ICON-------------------------------------------------------------------- */}
      {activeButton === 'openprofile' && <Profile />}
      {activeTab === 1 && (
        <div className="container">
          <div className="flex">
            <div className="sideNavSection">
              <SideNav
                setActiveMenu={setActiveMenu}
                nodeInfo={nodeInfo}
                searchRef={searchRef.current}
                activeMenu={activeMenu}
                mode={mode}
              />
            </div>
            <div className="sideNavSections">
              {nodeInfo && activeMenu !== '' ? (
                <NodeList
                  activeMenu={activeMenu}
                  searchRef={searchRef.current}
                  nodes={nodes}
                  nodeList={nodeInfo}
                  setNodes={setNodes}
                  setEdges={setEdges}
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                />
              ) : null}
            </div>
          </div>

          <div className="canvasSection" ref={ref}>
            {isLoading ? (
              <div className=" w-full h-full grid place-content-center">
                <MagnifyingGlass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="MagnifyingGlass-loading"
                  wrapperStyle={{}}
                  wrapperClass="MagnifyingGlass-wrapper"
                  glassColor="#c0efff"
                  color="#e15b64"
                />
                <h1 className="p-2 text-4xl">Loading...</h1>
              </div>
            ) : (
              <ReactFlowProvider>
                <CanvasArea
                  setNodeInfo={setNodeInfo}
                  nodeInfoList={nodeInfoList}
                  searchTerm={searchTerm}
                  nodes={nodes}
                  edges={edges}
                  onInit={onInit}
                  onConnect={onConnect}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                />
              </ReactFlowProvider>
            )}
          </div>
          <PopUp />

          <div className="toolSection-container">
            <div className="toolSection">
              <Tool
                zoomAction={handleFullScreen}
                getImage={getImage}
                onLayout={onLayout}
                canvasFunc={canvasFunc}
                toPng={toPng}
                nodes={nodes}
              />
            </div>
          </div>
        </div>
      )}
      {activeTab === 2 && <Ransomware />}

      <Footer
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
    </>
  );
};

export default NewCase;
