/* eslint-disable no-unused-vars */
import React, { createRef, useCallback, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

import {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { toPng } from 'html-to-image';
import Footer from '../components/Footer-newcase';
import CanvasArea from '../components/CanvasArea';
import NodeList from '../components/NodeList';
import SideNav from '../components/Sidebar';
import Tool from '../components/Tool';
import '../css/newcase.css';
import { getLayoutElements, themeChange } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import DrawerInfo from '../components/DrawerInfo';
import axios from 'axios';
import { MagnifyingGlass } from 'react-loader-spinner';
import constants from '../constant/routesConstant';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import bookmark from '../images/svg/questMark.svg';
import fridaySearch from '../images/svg/fridayLogo.svg';
import sun from '../images/svg/sun.svg';
import bell from '../images/svg/bell.svg';
import user from '../images/svg/userSolid.svg';
import { createFileName, useScreenshot } from 'use-react-screenshot';
import { v4 as uuidv4 } from 'uuid';
import Ransomware from './Ransomware';
import { logOut } from '../store/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, message } from 'antd';
import { async } from 'q';
// import { useEffect } from 'react';

const NewCase = () => {
  const { ROUTES, backendURL } = constants;
  const ref = createRef(null);
  const [_, takeScreenshot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isshow, setIsshow] = useState(false);
  const [isopenprofile, setIsopenprofile] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef();
  const [nodeInfo, setNodeInfo] = useState({ query: '', data: null });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [canvasFunc, setCanvasFunc] = useState();
  const [isChecked, setIsChecked] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('');
  const [nodeInfoList, setNodeInfoList] = useState([]);
  const showModal = () => {
    setOpen(true);
  };

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

  const openprofile = () => {
    setIsopenprofile(!isopenprofile);
  };

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

  const opendrawer = () => {
    setIsOpen(!isOpen);
  };

  const notification = () => {
    setIsshow(!isshow);
  };

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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const saveNode = async () => {
    setConfirmLoading(true);
    if (nodes.length > 0 && edges.length > 0) {
      const data = {
        edges,
        nodes,
        caseid: uuidv4(),
        casename: modalText,
      };
      const result = await axios.post(`${backendURL}newcase.php`, data, {
        headers: {
          Authorization: token,
        },
      });
      return result;
    } else {
      const error = 'No node is present in the canvas to be saved!';
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveMenu('');
    setIsLoading(true);

    axios
      .get(`${backendURL}/canvas.php?query=${search}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setNodeInfo({ query: search, data: response?.data });
        setNodeInfoList([
          ...nodeInfoList,
          { query: search, data: response?.data },
        ]);
        setNodes((prev) => [
          ...prev,
          {
            id: search,
            type: 'MyCustomNode',
            data: { label: search },
            position: { x: Math.random() * 500, y: Math.random() * 500 },
          },
        ]);

        setSearch('');
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  console.log('====================================');
  console.log(nodeInfoList);
  console.log('====================================');

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const handleOk = () => {
    saveNode()
      .then((res) => {
        setConfirmLoading(false);
        setModalText('');
        setOpen(false);
        message.success('Node was saved');
      })
      .catch((err) => {
        setConfirmLoading(false);
        setModalText('');
        setOpen(false);
        message.error(err);
      });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Save Node"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          onChange={(e) => setModalText(e.target.value)}
          value={modalText}
          placeholder="Enter Node Name"
        ></Input>
      </Modal>
      <Helmet>
        <title>FridayIntel-NewCase</title>
        <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
      </Helmet>
      <nav className="nav_bar">
        <section className="logo_box">
          <div className="case-dashboard">
            <div>
              <button className="btn-icon bookmark" onClick={showModal}>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                  className="bookmark-svg"
                >
                  <path
                    id="f991d79d"
                    d="M11.8951 17.133L16.4231 20.008C17.0071 20.3763 17.7259 19.8283 17.5552 19.1545L16.2435 13.9974C16.208 13.8545 16.2136 13.7044 16.2598 13.5645C16.3058 13.4247 16.3905 13.3007 16.504 13.2068L20.565 9.8197C21.095 9.37948 20.8255 8.49003 20.1337 8.44511L14.8329 8.10368C14.6883 8.09526 14.5492 8.0449 14.4328 7.95874C14.3163 7.87258 14.2274 7.75435 14.1771 7.61853L12.2005 2.6412C12.1482 2.49735 12.0528 2.37311 11.9275 2.28529C11.8022 2.19751 11.6527 2.15039 11.4997 2.15039C11.3466 2.15039 11.1973 2.19751 11.0719 2.28529C10.9465 2.37311 10.8513 2.49735 10.799 2.6412L8.8224 7.61853C8.77204 7.75435 8.68316 7.87258 8.56664 7.95874C8.45021 8.0449 8.31115 8.09526 8.16656 8.10368L2.86578 8.44511C2.17396 8.49003 1.90443 9.37948 2.43446 9.8197L6.49541 13.2068C6.60894 13.3007 6.69361 13.4247 6.73967 13.5645C6.78582 13.7044 6.79144 13.8545 6.75599 13.9974L5.5431 18.7771C5.33648 19.5857 6.19894 20.2416 6.89076 19.8014L11.1044 17.133C11.2226 17.0578 11.3597 17.018 11.4997 17.018C11.6398 17.018 11.7769 17.0578 11.8951 17.133V17.133Z"
                    fill="blue"
                    fillOpacity="0.1"
                  ></path>
                  <path
                    id="2070ed08"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5095 17.7395C11.5095 17.7395 11.5051 17.7367 11.4999 17.7367C11.4999 17.7367 11.4947 17.7367 11.4902 17.7395L7.27544 20.4086C7.27544 20.4086 6.82709 20.6939 6.30936 20.6577C6.30936 20.6577 5.83293 20.6245 5.4452 20.3297C5.4452 20.3297 5.06232 20.0387 4.89571 19.5908C4.89571 19.5908 4.71655 19.1091 4.84688 18.5992L6.05947 13.8206C6.05947 13.8206 6.06291 13.8067 6.05723 13.7895C6.05723 13.7895 6.05156 13.7723 6.03758 13.7607L1.97428 10.3717C1.97428 10.3717 1.6067 10.0664 1.4861 9.60862C1.4861 9.60862 1.37588 9.19029 1.50547 8.77163C1.50547 8.77163 1.6365 8.3483 1.96816 8.06798C1.96816 8.06798 2.33323 7.75942 2.81933 7.72785L8.12049 7.38642C8.12049 7.38642 8.13295 7.38568 8.1394 7.38091C8.1394 7.38091 8.14585 7.37614 8.14864 7.36861L8.15454 7.35326L10.1278 2.3842C10.1278 2.3842 10.2865 1.95804 10.6598 1.69657C10.6598 1.69657 11.0381 1.43164 11.4999 1.43164C11.4999 1.43164 11.9617 1.43164 12.34 1.69657C12.34 1.69657 12.7133 1.95804 12.872 2.3842L14.8452 7.35326L14.8511 7.36861C14.8511 7.36861 14.8539 7.37614 14.8604 7.38091C14.8604 7.38091 14.8668 7.38568 14.8748 7.38615L20.1801 7.72783C20.1801 7.72783 20.6665 7.75942 21.0316 8.06798C21.0316 8.06798 21.3633 8.3483 21.4943 8.77163C21.4943 8.77163 21.6239 9.19029 21.5137 9.60863C21.5137 9.60863 21.3931 10.0664 21.0243 10.3726L16.9646 13.7588C16.9646 13.7588 16.9482 13.7723 16.9425 13.7895C16.9425 13.7895 16.9369 13.8067 16.9412 13.8243L18.2519 18.9773C18.2519 18.9773 18.369 19.4394 18.2058 19.8757C18.2058 19.8757 18.054 20.2817 17.7063 20.545C17.7063 20.545 17.3538 20.812 16.9199 20.8418C16.9199 20.8418 16.4494 20.8742 16.0399 20.6159L11.5105 17.7401L11.5099 17.7398L11.5095 17.7395ZM16.8068 19.4001L12.281 16.5266L12.2805 16.5262C12.2805 16.5262 11.9232 16.2992 11.4999 16.2992C11.4999 16.2992 11.0763 16.2992 10.7189 16.5265L6.50637 19.1941C6.50637 19.1941 6.40854 19.2564 6.31513 19.1853C6.31513 19.1853 6.20263 19.0998 6.23962 18.9551L7.45281 14.1742C7.45281 14.1742 7.55794 13.7506 7.42251 13.3396C7.42251 13.3396 7.28708 12.9286 6.95361 12.6529L2.89503 9.26774C2.89503 9.26774 2.86453 9.24241 2.87869 9.19668C2.87869 9.19668 2.88885 9.16387 2.91248 9.16233L8.21288 8.82095C8.21288 8.82095 8.64374 8.79589 8.99429 8.53658C8.99429 8.53658 9.34102 8.28009 9.49312 7.87732L11.4671 2.90646L11.4746 2.88688C11.4746 2.88688 11.4775 2.87889 11.4844 2.87402C11.4844 2.87402 11.4914 2.86914 11.4999 2.86914C11.4999 2.86914 11.5084 2.86914 11.5154 2.87402C11.5154 2.87402 11.5223 2.87889 11.5252 2.88688L11.5327 2.90646L13.5067 7.87732C13.5067 7.87732 13.6588 8.28009 14.0055 8.53658C14.0055 8.53658 14.356 8.79589 14.7913 8.82122L20.0877 9.16235C20.0877 9.16235 20.1109 9.16387 20.1211 9.19668C20.1211 9.19668 20.1352 9.24241 20.1059 9.26677L16.0438 12.6549C16.0438 12.6549 15.7127 12.9286 15.5773 13.3396C15.5773 13.3396 15.4418 13.7506 15.546 14.1705L16.8588 19.3316C16.8588 19.3316 16.8698 19.3753 16.8384 19.3991C16.8384 19.3991 16.8233 19.4105 16.8068 19.4001Z"
                    fill="var(--primary-color)"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="dashboard-cases">
              <Link to={ROUTES.home}>
                <h3 className="dashboard-title">DASHBOARD&#160;/</h3>
              </Link>
              <h3 className="case-no">Case&#160;1</h3>
            </div>
          </div>
        </section>
        <section className="notification_btn">
          <div>
            <button className="newcase-noti-icon" onClick={opendrawer}>
              <img src={bookmark} alt="" />
            </button>

            {isOpen && <DrawerInfo />}
          </div>
          <form onSubmit={handleSubmit} className="searchbar-box">
            <img src={fridaySearch} alt="star" className="p-3.5 search-logo" />
            <input
              type="text"
              className="search-bar-NC"
              onChange={handleChange}
              placeholder="Search Keywords, TOR, URL, etc..."
              value={search}
            />
            <CiSearch className="searchbar-logo" />
          </form>
          <div>
            <button
              className="newcase-noti-icon"
              onClick={(e) => themeChange({ e, mode, setMode })}
            >
              <img src={sun} alt="" />
            </button>
          </div>
          <div>
            <button
              className="btn-icon newcase-noti-icon"
              onClick={notification}
            >
              <img src={bell} alt="" />
            </button>
            {/* NOTIFICATION BUTTON DATA---------------------------------------------------------------- */}
            {isshow && (
              <span className="noti">
                <article className="noti-data">
                  <h2>Notifications</h2>
                  <section className="notification-sections">
                    <p className="notifications">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="24"
                          height="24"
                          rx="8"
                          fill="var(--primary-color)"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 10.5C7 10.5 7 9.48308 7.39313 8.55362C7.39313 8.55362 7.77269 7.65624 8.46447 6.96447C8.46447 6.96447 9.15624 6.27269 10.0536 5.89313C10.0536 5.89313 10.9831 5.5 12 5.5C12 5.5 13.0169 5.5 13.9464 5.89313C13.9464 5.89313 14.8438 6.27269 15.5355 6.96447C15.5355 6.96447 16.2273 7.65624 16.6069 8.55362C16.6069 8.55362 17 9.48309 17 10.5V13.5C17 13.5 17 14.5169 16.6069 15.4464C16.6069 15.4464 16.2273 16.3438 15.5355 17.0355C15.5355 17.0355 14.8438 17.7273 13.9464 18.1069C13.9464 18.1069 13.0169 18.5 12 18.5C12 18.5 10.9831 18.5 10.0536 18.1069C10.0536 18.1069 9.15624 17.7273 8.46447 17.0355C8.46447 17.0355 7.77269 16.3438 7.39313 15.4464C7.39313 15.4464 7 14.5169 7 13.5V10.5ZM8 10.5V13.5C8 13.5 8 15.1569 9.17157 16.3284C9.17157 16.3284 10.3431 17.5 12 17.5C12 17.5 13.6569 17.5 14.8284 16.3284C14.8284 16.3284 16 15.1569 16 13.5V10.5C16 10.5 16 8.84315 14.8284 7.67157C14.8284 7.67157 13.6569 6.5 12 6.5C12 6.5 10.3431 6.5 9.17157 7.67157C9.17157 7.67157 8 8.84315 8 10.5Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M16.5 13H18C18.2761 13 18.5 12.7761 18.5 12.5C18.5 12.2239 18.2761 12 18 12H16.5C16.2239 12 16 12.2239 16 12.5C16 12.7761 16.2239 13 16.5 13Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M6 13H7.5C7.77614 13 8 12.7761 8 12.5C8 12.2239 7.77614 12 7.5 12H6C5.72386 12 5.5 12.2239 5.5 12.5C5.5 12.7761 5.72386 13 6 13Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M6 15H7.6125C7.88864 15 8.1125 14.7761 8.1125 14.5C8.1125 14.2239 7.88864 14 7.6125 14H6C5.72386 14 5.5 14.2239 5.5 14.5C5.5 14.7761 5.72386 15 6 15Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M6 11H18C18.2761 11 18.5 10.7761 18.5 10.5C18.5 10.2239 18.2761 10 18 10H6C5.72386 10 5.5 10.2239 5.5 10.5C5.5 10.7761 5.72386 11 6 11Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M11.5 12.5V18C11.5 18.2761 11.7239 18.5 12 18.5C12.2761 18.5 12.5 18.2761 12.5 18V12.5C12.5 12.2239 12.2761 12 12 12C11.7239 12 11.5 12.2239 11.5 12.5Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M16.3875 15H18C18.2762 15 18.5 14.7761 18.5 14.5C18.5 14.2239 18.2762 14 18 14H16.3875C16.1114 14 15.8875 14.2239 15.8875 14.5C15.8875 14.7761 16.1114 15 16.3875 15Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M7.14945 6.11258L8.63695 7.52508C8.72987 7.61331 8.85311 7.6625 8.98124 7.6625L8.98218 7.6625L8.99417 7.66233C9.12673 7.6589 9.25251 7.60296 9.34382 7.50679C9.43205 7.41388 9.48124 7.29063 9.48124 7.1625L9.48124 7.16156L9.48108 7.14957C9.47765 7.01701 9.4217 6.89124 9.32554 6.79992L7.83804 5.38742C7.74512 5.29919 7.62188 5.25 7.49374 5.25L7.48082 5.25017C7.34825 5.2536 7.22248 5.30954 7.13117 5.40571C7.04294 5.49862 6.99374 5.62187 6.99374 5.75L6.99391 5.76293C6.99734 5.89549 7.05329 6.02126 7.14945 6.11258Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M16.1495 5.38739L14.6683 6.79364C14.5721 6.88494 14.5161 7.0107 14.5127 7.14327L14.5125 7.15625L14.5126 7.16729C14.5154 7.29156 14.5643 7.41036 14.6499 7.5005C14.7412 7.59668 14.867 7.65264 14.9995 7.65608L15.0125 7.65625L15.0236 7.65613C15.1478 7.65338 15.2666 7.60445 15.3568 7.51886L16.838 6.11261C16.9342 6.02131 16.9902 5.89555 16.9936 5.76298L16.9938 5.75L16.9936 5.73896C16.9909 5.61469 16.942 5.49589 16.8564 5.40575C16.7651 5.30957 16.6393 5.25361 16.5067 5.25017L16.4938 5.25L16.4827 5.25012C16.3584 5.25287 16.2397 5.3018 16.1495 5.38739Z"
                          fill="var(--secondary-color)"
                        />
                      </svg>
                      &#160; You have a bug that needs to......
                    </p>
                    <p className="datestamp">5m ago</p>
                  </section>
                  <section className="notification-sections">
                    <p className="notifications">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="24"
                          height="24"
                          rx="8"
                          fill="var(--primary-color)"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7 10.5C7 10.5 7 9.48308 7.39313 8.55362C7.39313 8.55362 7.77269 7.65624 8.46447 6.96447C8.46447 6.96447 9.15624 6.27269 10.0536 5.89313C10.0536 5.89313 10.9831 5.5 12 5.5C12 5.5 13.0169 5.5 13.9464 5.89313C13.9464 5.89313 14.8438 6.27269 15.5355 6.96447C15.5355 6.96447 16.2273 7.65624 16.6069 8.55362C16.6069 8.55362 17 9.48309 17 10.5V13.5C17 13.5 17 14.5169 16.6069 15.4464C16.6069 15.4464 16.2273 16.3438 15.5355 17.0355C15.5355 17.0355 14.8438 17.7273 13.9464 18.1069C13.9464 18.1069 13.0169 18.5 12 18.5C12 18.5 10.9831 18.5 10.0536 18.1069C10.0536 18.1069 9.15624 17.7273 8.46447 17.0355C8.46447 17.0355 7.77269 16.3438 7.39313 15.4464C7.39313 15.4464 7 14.5169 7 13.5V10.5ZM8 10.5V13.5C8 13.5 8 15.1569 9.17157 16.3284C9.17157 16.3284 10.3431 17.5 12 17.5C12 17.5 13.6569 17.5 14.8284 16.3284C14.8284 16.3284 16 15.1569 16 13.5V10.5C16 10.5 16 8.84315 14.8284 7.67157C14.8284 7.67157 13.6569 6.5 12 6.5C12 6.5 10.3431 6.5 9.17157 7.67157C9.17157 7.67157 8 8.84315 8 10.5Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M16.5 13H18C18.2761 13 18.5 12.7761 18.5 12.5C18.5 12.2239 18.2761 12 18 12H16.5C16.2239 12 16 12.2239 16 12.5C16 12.7761 16.2239 13 16.5 13Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M6 13H7.5C7.77614 13 8 12.7761 8 12.5C8 12.2239 7.77614 12 7.5 12H6C5.72386 12 5.5 12.2239 5.5 12.5C5.5 12.7761 5.72386 13 6 13Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M6 15H7.6125C7.88864 15 8.1125 14.7761 8.1125 14.5C8.1125 14.2239 7.88864 14 7.6125 14H6C5.72386 14 5.5 14.2239 5.5 14.5C5.5 14.7761 5.72386 15 6 15Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M6 11H18C18.2761 11 18.5 10.7761 18.5 10.5C18.5 10.2239 18.2761 10 18 10H6C5.72386 10 5.5 10.2239 5.5 10.5C5.5 10.7761 5.72386 11 6 11Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M11.5 12.5V18C11.5 18.2761 11.7239 18.5 12 18.5C12.2761 18.5 12.5 18.2761 12.5 18V12.5C12.5 12.2239 12.2761 12 12 12C11.7239 12 11.5 12.2239 11.5 12.5Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M16.3875 15H18C18.2762 15 18.5 14.7761 18.5 14.5C18.5 14.2239 18.2762 14 18 14H16.3875C16.1114 14 15.8875 14.2239 15.8875 14.5C15.8875 14.7761 16.1114 15 16.3875 15Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M7.14945 6.11258L8.63695 7.52508C8.72987 7.61331 8.85311 7.6625 8.98124 7.6625L8.98218 7.6625L8.99417 7.66233C9.12673 7.6589 9.25251 7.60296 9.34382 7.50679C9.43205 7.41388 9.48124 7.29063 9.48124 7.1625L9.48124 7.16156L9.48108 7.14957C9.47765 7.01701 9.4217 6.89124 9.32554 6.79992L7.83804 5.38742C7.74512 5.29919 7.62188 5.25 7.49374 5.25L7.48082 5.25017C7.34825 5.2536 7.22248 5.30954 7.13117 5.40571C7.04294 5.49862 6.99374 5.62187 6.99374 5.75L6.99391 5.76293C6.99734 5.89549 7.05329 6.02126 7.14945 6.11258Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M16.1495 5.38739L14.6683 6.79364C14.5721 6.88494 14.5161 7.0107 14.5127 7.14327L14.5125 7.15625L14.5126 7.16729C14.5154 7.29156 14.5643 7.41036 14.6499 7.5005C14.7412 7.59668 14.867 7.65264 14.9995 7.65608L15.0125 7.65625L15.0236 7.65613C15.1478 7.65338 15.2666 7.60445 15.3568 7.51886L16.838 6.11261C16.9342 6.02131 16.9902 5.89555 16.9936 5.76298L16.9938 5.75L16.9936 5.73896C16.9909 5.61469 16.942 5.49589 16.8564 5.40575C16.7651 5.30957 16.6393 5.25361 16.5067 5.25017L16.4938 5.25L16.4827 5.25012C16.3584 5.25287 16.2397 5.3018 16.1495 5.38739Z"
                          fill="var(--secondary-color)"
                        />
                      </svg>
                      &#160; You have bug that needs to.......
                    </p>
                    <p className="datestamp">0:32 AM</p>
                  </section>
                  <section className="notification-sections">
                    <p className="notifications">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="24"
                          height="24"
                          rx="8"
                          fill="var(--primary-color)"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.0001 9.49976C12.0001 9.49976 13.0356 9.49976 13.7678 10.232C13.7678 10.232 14.5001 10.9642 14.5001 11.9998C14.5001 11.9998 14.5001 13.0353 13.7678 13.7675C13.7678 13.7675 13.0356 14.4998 12.0001 14.4998C12.0001 14.4998 10.9645 14.4998 10.2323 13.7675C10.2323 13.7675 9.50006 13.0353 9.50006 11.9998C9.50006 11.9998 9.50006 10.9642 10.2323 10.232C10.2323 10.232 10.9645 9.49976 12.0001 9.49976ZM12.0001 10.4998C12.0001 10.4998 11.3787 10.4998 10.9394 10.9391C10.9394 10.9391 10.5001 11.3784 10.5001 11.9998C10.5001 11.9998 10.5001 12.6211 10.9394 13.0604C10.9394 13.0604 11.3787 13.4998 12.0001 13.4998C12.0001 13.4998 12.6214 13.4998 13.0607 13.0604C13.0607 13.0604 13.5001 12.6211 13.5001 11.9998C13.5001 11.9998 13.5001 11.3784 13.0607 10.9391C13.0607 10.9391 12.6214 10.4998 12.0001 10.4998Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M9.17217 9.17223C9.26593 9.07846 9.31881 8.95109 9.31881 8.81848C9.31881 8.68597 9.2662 8.55888 9.17256 8.46512C9.07879 8.37136 8.95142 8.31848 8.81881 8.31848C8.68629 8.31848 8.5592 8.37108 8.46545 8.46473C7.77418 9.15524 7.39541 10.0559 7.39541 10.0559C6.99994 10.9866 6.99994 11.9997 6.99994 11.9997C6.99994 13.0128 7.39613 13.9453 7.39613 13.9453C7.77418 14.8442 8.46545 15.5347 8.46545 15.5347C8.5592 15.6284 8.6863 15.681 8.81881 15.681C8.95142 15.6809 9.07884 15.6282 9.17256 15.5343C9.2662 15.4406 9.31881 15.3135 9.31881 15.181C9.31873 15.0484 9.26599 14.9209 9.17217 14.8272C8.61984 14.2755 8.31649 13.5542 8.31649 13.5542C7.99994 12.8092 7.99994 11.9997 7.99994 11.9997C7.99994 11.1903 8.31721 10.4436 8.31721 10.4436C8.61985 9.72394 9.17217 9.17223 9.17217 9.17223Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M15.5349 8.46493C16.226 9.15537 16.604 10.0542 16.604 10.0542C17.0002 10.9866 17.0002 11.9997 17.0002 11.9997C17.0002 13.0128 16.6047 13.9436 16.6047 13.9436C16.2259 14.8442 15.5347 15.5347 15.5347 15.5347C15.4472 15.6221 15.3304 15.674 15.2069 15.6803C15.1984 15.6808 15.1898 15.681 15.1813 15.681C15.0486 15.681 14.9213 15.6282 14.8276 15.5343C14.7397 15.4464 14.6878 15.3289 14.6819 15.2047C14.6815 15.1968 14.6813 15.1889 14.6813 15.181C14.6814 15.0484 14.7341 14.9209 14.8279 14.8272C15.3803 14.2755 15.6829 13.5559 15.6829 13.5559C16.0002 12.8092 16.0002 11.9997 16.0002 11.9997C16.0002 11.1903 15.6836 10.4453 15.6836 10.4453C15.3803 9.72394 14.8279 9.17223 14.8279 9.17223C14.7341 9.07845 14.6813 8.95119 14.6813 8.81848C14.6813 8.68699 14.7331 8.5608 14.8255 8.46722L14.8276 8.46512C14.9104 8.38222 15.0197 8.33103 15.1364 8.3205C15.1512 8.31916 15.1661 8.31849 15.181 8.31848C15.3114 8.31848 15.4369 8.3694 15.5303 8.46038L15.5349 8.46493Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M7.4036 7.40336L7.40588 7.40106C7.49825 7.30749 7.55005 7.18129 7.55005 7.0498C7.55005 6.91704 7.49724 6.78972 7.40328 6.69593L7.399 6.6917C7.30563 6.60072 7.18042 6.5498 7.05005 6.5498C7.0352 6.54982 7.01991 6.55049 7.00512 6.55183C6.88835 6.56236 6.779 6.6136 6.69617 6.69658C5.66247 7.73227 5.08988 9.07924 5.08988 9.07924C4.5 10.4809 4.5 11.9998 4.5 11.9998C4.5 13.5187 5.0892 14.9188 5.0892 14.9188C5.66229 16.2673 6.69617 17.303 6.69617 17.303C6.78985 17.3969 6.91698 17.4497 7.04959 17.4498C7.05744 17.4498 7.06576 17.4496 7.07361 17.4492C7.19777 17.4434 7.3153 17.3915 7.40328 17.3037C7.49724 17.2099 7.55005 17.0826 7.55005 16.9498C7.55005 16.9413 7.54983 16.9329 7.5494 16.9244C7.54312 16.8009 7.49129 16.6841 7.40393 16.5966C6.50687 15.6979 6.0109 14.5309 6.0109 14.5309C5.5 13.3169 5.5 11.9998 5.5 11.9998C5.5 10.6827 6.01022 9.47037 6.01022 9.47037C6.50678 8.30195 7.4036 7.40336 7.4036 7.40336Z"
                          fill="var(--secondary-color)"
                        />
                        <path
                          d="M17.3043 6.69688L17.3036 6.69625C17.21 6.6026 17.083 6.54993 16.9505 6.5498C16.8181 6.5498 16.6906 6.60236 16.5968 6.69593C16.5031 6.78969 16.4501 6.9172 16.4501 7.0498C16.4501 7.18225 16.5026 7.30929 16.5962 7.40303C17.4932 8.30174 17.9892 9.46875 17.9892 9.46875C18.5001 10.6827 18.5001 11.9998 18.5001 11.9998C18.5001 13.3169 17.9899 14.5292 17.9899 14.5292C17.4932 15.6979 16.5962 16.5966 16.5962 16.5966C16.5026 16.6903 16.4501 16.8174 16.4501 16.9498C16.4502 17.0824 16.503 17.21 16.5968 17.3037C16.6906 17.3973 16.8176 17.4498 16.9501 17.4498C17.0827 17.4497 17.2103 17.3969 17.304 17.303C18.3378 16.2673 18.9102 14.9204 18.9102 14.9204C19.5001 13.5187 19.5001 11.9998 19.5001 11.9998C19.5001 10.4809 18.9109 9.08085 18.9109 9.08085C18.3379 7.73255 17.3043 6.69688 17.3043 6.69688Z"
                          fill="var(--secondary-color)"
                        />
                      </svg>
                      &#160; Welcome to friday intel &#128075;
                    </p>
                    <p className="datestamp">Yesterday 12:39 AM</p>
                  </section>

                  <section className="delete-noti-btn">
                    <span className="noti-icon-delete">
                      <RiDeleteBinLine />
                    </span>
                    <h4 className="clear-noti">Clear Notification</h4>
                  </section>
                </article>
                <div className="noti-triangle"></div>
              </span>
            )}
          </div>
          <div>
            <button
              className="btn-icon member-icon hover-member newcase-noti-icon"
              onClick={openprofile}
            >
              <img src={user} alt="" />
            </button>
          </div>
        </section>
      </nav>
      {/* PROFILE HOVER ICON-------------------------------------------------------------------- */}
      {isopenprofile && (
        <span className="pro">
          <div className="pro-data">
            <h2>Unit Charlie</h2>

            <article>
              <span className="pro-icon">
                <svg
                  width="24"
                  height="27"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.5 13.3332C23.5 20.1572 18.3214 25.6332 12 25.6332C5.67863 25.6332 0.5 20.1572 0.5 13.3332C0.5 6.50921 5.67863 1.0332 12 1.0332C18.3214 1.0332 23.5 6.50921 23.5 13.3332Z"
                    fill="var(--primary-color)"
                    fillOpacity="0.7"
                    stroke="var(--primary-color)"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="11.5"
                    fill="var(--secondary-color)"
                    stroke="var(--primary-color)"
                  />
                  <path
                    d="M17.0688 12.2668C17.0688 14.9178 14.9197 17.0668 12.2688 17.0668C9.61777 17.0668 7.46875 14.9178 7.46875 12.2668C7.46875 9.61583 9.61777 7.4668 12.2688 7.4668C14.9197 7.4668 17.0688 9.61583 17.0688 12.2668Z"
                    fill="var(--primary-color)"
                    fillOpacity="0.1"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.2672 9.8667C12.2672 9.8667 13.2613 9.8667 13.9642 10.5696C13.9642 10.5696 14.6672 11.2726 14.6672 12.2667C14.6672 12.2667 14.6672 13.2608 13.9642 13.9638C13.9642 13.9638 13.2613 14.6667 12.2672 14.6667C12.2672 14.6667 11.2731 14.6667 10.5701 13.9638C10.5701 13.9638 9.86719 13.2608 9.86719 12.2667C9.86719 12.2667 9.86719 11.2726 10.5701 10.5696C10.5701 10.5696 11.2731 9.8667 12.2672 9.8667ZM12.2672 10.6667C12.2672 10.6667 11.6044 10.6667 11.1358 11.1353C11.1358 11.1353 10.6672 11.604 10.6672 12.2667C10.6672 12.2667 10.6672 12.9294 11.1358 13.3981C11.1358 13.3981 11.6044 13.8667 12.2672 13.8667C12.2672 13.8667 12.9299 13.8667 13.3986 13.3981C13.3986 13.3981 13.8672 12.9294 13.8672 12.2667C13.8672 12.2667 13.8672 11.604 13.3986 11.1353C13.3986 11.1353 12.9299 10.6667 12.2672 10.6667Z"
                    fill="var(--primary-color)"
                  />
                  <path
                    d="M14.6673 12.2665V10.2665C14.6673 10.0456 14.4882 9.86651 14.2673 9.86651C14.0464 9.86651 13.8673 10.0456 13.8673 10.2665V12.2665C13.8673 13.2724 14.2526 13.8921 14.2526 13.8921C14.7341 14.6665 15.6673 14.6665 15.6673 14.6665C16.6005 14.6665 17.082 13.8921 17.082 13.8921C17.4673 13.2724 17.4673 12.2665 17.4673 12.2665C17.4668 10.4787 16.3672 9.0691 16.3672 9.0691C15.2675 7.65954 13.5336 7.22418 13.5336 7.22418C11.7996 6.78883 10.1646 7.51174 10.1646 7.51174C8.52947 8.23466 7.6846 9.81018 7.6846 9.81018C6.83972 11.3857 7.14228 13.1477 7.14228 13.1477C7.44484 14.9097 8.76691 16.1131 8.76691 16.1131C10.089 17.3165 11.8716 17.4526 11.8716 17.4526C13.6539 17.5886 15.1432 16.6 15.1432 16.6L15.1435 16.5998C15.2552 16.5256 15.3223 16.4005 15.3223 16.2665L15.3223 16.2637C15.3217 16.1859 15.2985 16.11 15.2555 16.0453C15.1814 15.9336 15.0563 15.8665 14.9223 15.8665L14.9194 15.8665C14.8417 15.8671 14.7658 15.8903 14.701 15.9333C13.4408 16.77 11.9324 16.6549 11.9324 16.6549C10.4241 16.5398 9.30543 15.5215 9.30543 15.5215C8.18675 14.5032 7.93074 13.0123 7.93074 13.0123C7.67473 11.5214 8.38962 10.1883 8.38962 10.1883C9.10452 8.85512 10.488 8.24342 10.488 8.24342C11.8716 7.63172 13.3388 8.0001 13.3388 8.0001C14.8059 8.36848 15.7364 9.56118 15.7364 9.56118C16.6669 10.7539 16.6673 12.2665 16.6673 12.2665C16.6673 13.044 16.4026 13.4697 16.4026 13.4697C16.1558 13.8665 15.6673 13.8665 15.6673 13.8665C15.1787 13.8665 14.932 13.4697 14.932 13.4697C14.6673 13.044 14.6673 12.2665 14.6673 12.2665Z"
                    fill="var(--primary-color)"
                  />
                </svg>
              </span>
              <h4> jhon.doe@fridayintek.io</h4>
            </article>
            <article>
              <span className="pro-icon">
                <button className="btn_memberHover">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.19961 10.8001V2.0001C7.19961 1.89399 7.15746 1.79229 7.08245 1.71724C7.00744 1.64224 6.90569 1.6001 6.79961 1.6001H1.99961C1.89352 1.6001 1.79178 1.64224 1.71677 1.71724C1.64175 1.79229 1.59961 1.89399 1.59961 2.0001V10.8001"
                      fill="black"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M0.800391 11.1999H12.0004C12.2213 11.1999 12.4004 11.0208 12.4004 10.7999C12.4004 10.579 12.2213 10.3999 12.0004 10.3999H0.800391C0.579477 10.3999 0.400391 10.579 0.400391 10.7999C0.400391 11.0208 0.579477 11.1999 0.800391 11.1999Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M1.2002 2.0002V10.8002C1.2002 11.0211 1.37928 11.2002 1.6002 11.2002C1.82111 11.2002 2.0002 11.0211 2.0002 10.8002V2.0002H6.80019V10.8002C6.80019 11.0211 6.97928 11.2002 7.20019 11.2002C7.42111 11.2002 7.60019 11.0211 7.60019 10.8002V2.0002C7.60019 1.66882 7.36588 1.43451 7.36588 1.43451C7.13157 1.2002 6.80019 1.2002 6.80019 1.2002H2.0002C1.66882 1.2002 1.43451 1.43451 1.43451 1.43451C1.2002 1.66882 1.2002 2.0002 1.2002 2.0002Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M10.7998 4.3999H7.1998C6.97889 4.3999 6.7998 4.57899 6.7998 4.7999C6.7998 5.02082 6.97889 5.1999 7.1998 5.1999H10.7998V10.7999C10.7998 11.0208 10.9789 11.1999 11.1998 11.1999C11.4207 11.1999 11.5998 11.0208 11.5998 10.7999V5.1999C11.5998 4.86853 11.3655 4.63422 11.3655 4.63422C11.1312 4.3999 10.7998 4.3999 10.7998 4.3999Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M3.1998 4.0002H4.7998C5.02072 4.0002 5.19981 3.82111 5.19981 3.6002C5.19981 3.37928 5.02072 3.2002 4.7998 3.2002H3.1998C2.97889 3.2002 2.7998 3.37928 2.7998 3.6002C2.7998 3.82111 2.97889 4.0002 3.1998 4.0002Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M3.99961 7.1999H5.59961C5.82052 7.1999 5.99961 7.02082 5.99961 6.7999C5.99961 6.57899 5.82052 6.3999 5.59961 6.3999H3.99961C3.7787 6.3999 3.59961 6.57899 3.59961 6.7999C3.59961 7.02082 3.7787 7.1999 3.99961 7.1999Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M3.1998 9.1999H4.7998C5.02072 9.1999 5.19981 9.02082 5.19981 8.7999C5.19981 8.57899 5.02072 8.3999 4.7998 8.3999H3.1998C2.97889 8.3999 2.7998 8.57899 2.7998 8.7999C2.7998 9.02082 2.97889 9.1999 3.1998 9.1999Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M8.40039 8.7999C8.40039 9.02082 8.57948 9.1999 8.80039 9.1999H9.60039C9.8213 9.1999 10.0004 9.02082 10.0004 8.7999C10.0004 8.57899 9.8213 8.3999 9.60039 8.3999H8.80039C8.57948 8.3999 8.40039 8.57899 8.40039 8.7999Z"
                      fill="var(--primary-color-1)"
                    />
                    <path
                      d="M8.40039 6.7999C8.40039 7.02082 8.57948 7.1999 8.80039 7.1999H9.60039C9.8213 7.1999 10.0004 7.02082 10.0004 6.7999C10.0004 6.57899 9.8213 6.3999 9.60039 6.3999H8.80039C8.57948 6.3999 8.40039 6.57899 8.40039 6.7999Z"
                      fill="var(--primary-color-1)"
                    />
                  </svg>
                </button>
              </span>
              <h4>Kangaroo Agency</h4>
            </article>
            <button
              className="member_btn_edit"
              onClick={() => navigate(ROUTES.member)}
            >
              Edit Profile
            </button>
            <button
              className="member_btn_membership"
              onClick={() => navigate(ROUTES.member)}
            >
              Membership info
            </button>
            <span className="logout-btn" onClick={handleLogOut}>
              <AiOutlineLogout className="logout-icon" />
              <h4>Log Out</h4>
            </span>
          </div>
          <div className="pro-triangle"></div>
        </span>
      )}
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
      {/* <div className="container">
        <div className="flex">
          <div className="sideNavSection">
            <SideNav
              setActiveMenu={setActiveMenu}
              nodeInfo={nodeInfo}
              searchRef={searchRef.current}
              activeMenu={activeMenu}
            />
          </div>
          <div>
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
      </div> */}

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
