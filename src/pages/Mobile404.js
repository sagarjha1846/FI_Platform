import React from 'react';
import Mobileerror from '../images/svg/Mobilerror.svg';
import '../css/mobile404.css';

const Mobile404 = () => {
  return (
    <div className="main">
      <img src={Mobileerror} alt="logo" />
      <p className="paragraph">This window is not compatible with</p>
      <p className="device">mobile devices</p>
    </div>
  );
};

export default Mobile404;
