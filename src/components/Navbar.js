import React from 'react';
import '../css/navbar.css';
import DrawerInfo from './DrawerInfo';
import { CiSearch } from 'react-icons/ci';
import Notication from './Notication';
import Profile from './Profile';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ReactComponent as FILogo } from '../images/svg/fridayLogo.svg';
import { useState } from 'react';
import '../css/newcase.css';
import { themeChange } from '../utils';
import constants from '../constant/routesConstant';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'antd';
import { ReactComponent as Logo } from '../images/svg/firdayIntel.svg';
import { ReactComponent as BookMark } from '../images/svg/bookmarkIcon.svg';
import { ReactComponent as Sun } from '../images/svg/sun.svg';
import { ReactComponent as Bell } from '../images/svg/bell.svg';
import { ReactComponent as User } from '../images/svg/user.svg';
import { ReactComponent as Star } from '../images/svg/star.svg';
import { ReactComponent as SunShine } from '../images/svg/sunshine.svg';
import { ReactComponent as Moon } from '../images/svg/moon.svg';
import nightImage from '../images/night.png';
import dayImage from '../images/day.png';
import dark from '../images/svg/darklogo.svg';
import light from '../images/logo.png';

const Navbar = ({
  nodes,
  edges,
  caseName,
  setNodeInfo,
  setNodeInfoList,
  nodeInfoList,
  setNodes,
  setIsLoading,
  mode,
  setMode,
}) => {
  const [logoo, setLogoo] = useState(light);
  const [search, setSearch] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const { ROUTES, backendURL } = constants;
  const { token } = useSelector((state) => state.auth);

  const handleButtonClick = (button) => {
    setActiveButton((prevButton) => (prevButton === button ? null : button));
  };

  const saveNode = async () => {
    if (nodes.length > 0 && edges.length > 0) {
      const data = {
        edges,
        nodes,
        caseid: uuidv4(),
        casename: caseName,
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

  const handleOk = () => {
    saveNode()
      .then((res) => {
        message.success('Node was saved');
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/newcase') {
      setIsLoading(true);

      axios
        .get(`${backendURL}canvas.php?query=${search}`, {
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
        .catch((err) => {
          console.log(err);
          setIsLoading(true);
        });
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <nav className="nav_bar">
      {location.pathname === '/member' ? (
        <nav className="navbar-member">
          <section className="member-profile">
            <h2 className="member_profile-name">Profile </h2>
            <span>/</span>
            <h4 className="member-friday_intel">Friday Intel</h4>
          </section>
          <section className="theme-notification"></section>
          <section className="theme-toggle-notification">
            <div className="switch-container-member">
              <input
                type="checkbox"
                id="switch"
                onClick={(event) =>
                  themeChange({
                    event,
                    setMode,
                    mode,
                    nightImage,
                    dayImage,
                    setLogoo,
                    logoo,
                    light,
                    dark,
                  })
                }
              />
              <label
                htmlFor="switch"
                id="theme-label"
                style={{
                  backgroundImage: `url(${!mode ? nightImage : dayImage})`,
                  backgroundSize: 'cover',
                }}
              >
                <i className="fas fa-sun">
                  <SunShine />
                </i>
                <i className="fas fa-moon">
                  <Moon />
                </i>
              </label>
            </div>
            <div>
              <button
                className="btn-icon"
                onClick={() => handleButtonClick('notification')}
              >
                <Bell style={{ fill: 'var(--primary-color)' }} />
              </button>
              {activeButton === 'notification' && <Notication />}
            </div>
          </section>
        </nav>
      ) : (
        <>
          <section className="logo_box">
            {location.pathname === '/newcase' ? (
              <div className="case-dashboard">
                <div>
                  <button className="btn-icon bookmark" onClick={handleOk}>
                    <Star style={{ fill: 'var(--primary-color)' }} />
                  </button>
                </div>
                <div className="dashboard-cases">
                  <Link to={ROUTES.home}>
                    <h3 className="dashboard-title">Dashboard&#160;/</h3>
                  </Link>
                  <h3 className="case-no">{caseName}</h3>
                </div>
              </div>
            ) : (
              <Logo style={{ fill: 'var(--primary-color)' }} />
            )}
          </section>
          <section className="notification_btn">
            <div>
              <button
                className="btn-icon"
                onClick={() => handleButtonClick('opendrawer')}
              >
                <BookMark style={{ fill: 'var(--primary-color)' }} />
              </button>
              {activeButton === 'opendrawer' && <DrawerInfo />}
            </div>
            <form onSubmit={handleSubmit} className="searchbar-box">
              <FILogo style={{ fill: 'var(--primary-color)' }} />
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
                className="btn-icon"
                onClick={(event) => themeChange({ event, setMode, mode })}
              >
                <Sun style={{ fill: 'var(--primary-color)' }} />
              </button>
            </div>
            <div>
              <button
                className="btn-icon"
                onClick={() => handleButtonClick('notification')}
              >
                <Bell style={{ fill: 'var(--primary-color)' }} />
              </button>
              {activeButton === 'notification' && <Notication />}
            </div>
            <div onClick={() => handleButtonClick('openprofile')}>
              <button className="btn-icon member-notification">
                <User style={{ fill: 'var(--primary-color)' }} />
              </button>
              {activeButton === 'openprofile' && <Profile />}
            </div>
          </section>
        </>
      )}
    </nav>
  );
};

export default Navbar;
