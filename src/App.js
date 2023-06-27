import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

// import CanvasTools from "./components/CanvasTools";
import CaseBlog from './pages/CaseBlog';
import ForgetPassword from './pages/ForgetPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import NewCase from './pages/NewCase';
import LoadCase from './pages/LoadCase';
import Page404 from './pages/Page404';
import ReadCase from './pages/ReadCase';
import Member from './pages/Member';
import constants from './constant/routesConstant';

import { useSelector } from 'react-redux';
import { PrivateRoute } from './store/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer-newcase';
import { useRef, useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

const App = () => {
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  const { ROUTES } = constants;

  const searchRef = useRef();
  const [nodeInfo, setNodeInfo] = useState({ query: '', data: null });
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [canvasFunc, setCanvasFunc] = useState();
  const [isChecked, setIsChecked] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');
  const [mode, setMode] = useState(true);
  const [nodeInfoList, setNodeInfoList] = useState([]);
  const [caseName, setCaseName] = useState('');
  return (
    <>
      {token && (
        <nav>
          <Navbar
            nodes={nodes}
            edges={edges}
            caseName={caseName}
            setNodeInfo={setNodeInfo}
            setNodeInfoList={setNodeInfoList}
            nodeInfoList={nodeInfoList}
            setNodes={setNodes}
            setIsLoading={setIsLoading}
            setCaseName={setCaseName}
            setMode={setMode}
            mode={mode}
          />
        </nav>
      )}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path={ROUTES.home}
            element={
              <Home
                caseName={caseName}
                setCaseName={setCaseName}
                setMode={setMode}
                mode={mode}
              />
            }
          />
          <Route
            path={ROUTES.newCase}
            element={
              <NewCase
                setEdges={setEdges}
                setNodes={setNodes}
                setCanvasFunc={setCanvasFunc}
                nodes={nodes}
                edges={edges}
                setActiveMenu={setActiveMenu}
                nodeInfo={nodeInfo}
                searchRef={searchRef}
                activeMenu={activeMenu}
                setMode={setMode}
                mode={mode}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                isLoading={isLoading}
                setNodeInfo={setNodeInfo}
                nodeInfoList={nodeInfoList}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                canvasFunc={canvasFunc}
              />
            }
          />
          <Route
            path={ROUTES.caseBlog}
            element={<CaseBlog setMode={setMode} mode={mode} />}
          />
          <Route
            path={ROUTES.loadCase}
            element={<LoadCase setMode={setMode} mode={mode} />}
          />
          <Route
            path={ROUTES.readCase}
            element={<ReadCase setMode={setMode} mode={mode} />}
          />
          <Route
            path={ROUTES.member}
            element={<Member setMode={setMode} mode={mode} />}
          />
        </Route>
        <Route
          path={ROUTES.login}
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login setMode={setMode} mode={mode} />
            )
          }
        />

        <Route
          path={ROUTES.forgotPassword}
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <ForgetPassword setMode={setMode} mode={mode} />
            )
          }
        />

        <Route path="*" element={<Page404 setMode={setMode} mode={mode} />} />
      </Routes>

      {token && location.pathname === '/newcase' && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
};

export default App;
