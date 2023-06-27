import React from 'react';
import { ReactComponent as Logo } from '../images/svg/firdayIntel.svg';
import { ReactComponent as SunShine } from '../images/svg/sunshine.svg';
import { ReactComponent as Moon } from '../images/svg/moon.svg';
import { themeChange } from '../utils';
import { useState } from 'react';
import nightImage from '../images/night.png';
import dayImage from '../images/day.png';
import light from '../images/logo.png';
import dark from '../images/svg/darklogo.svg';

const CommonHeader = ({ setMode, mode }) => {
  const [logoo, setLogoo] = useState(mode ? 'light' : 'dark');
  return (
    <div>
      <nav className="navbar-login">
        <section className="logo">
          <Logo style={{ fill: 'var(--primary-color)' }} />
        </section>
        <section className="theme-toggle">
          <div className="switch-container">
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
        </section>
      </nav>
    </div>
  );
};

export default CommonHeader;
