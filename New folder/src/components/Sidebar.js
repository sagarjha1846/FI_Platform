import { Button, Menu } from 'antd';
import '../css/sidebar.css';
import React from 'react';
import { useState } from 'react';
import { BsGlobe2 } from 'react-icons/bs';
import { VscFile } from 'react-icons/vsc';
import { IoDocumentLockOutline } from 'react-icons/io5';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
const Sidenav = (props) => {
  const { nodeInfo, setActiveMenu, mode } = props;

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const menu = [
    {
      label: 'Terrorist Profilling',
      key: 'terroristprofilling',
      icon: (
        <svg
          className="terrorist-profiling_logo"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.5 12.75C4.5 12.75 4.5 11.1967 5.59835 10.0983C5.59835 10.0983 6.6967 9 8.25 9H15.75C15.75 9 17.3033 9 18.4016 10.0983C18.4016 10.0983 19.5 11.1967 19.5 12.75V13.5C19.5 13.5 19.5 15.0533 18.4016 16.1517C18.4016 16.1517 17.3033 17.25 15.75 17.25H8.25C8.25 17.25 6.6967 17.25 5.59835 16.1517C5.59835 16.1517 4.5 15.0533 4.5 13.5V12.75ZM6 12.75L6 13.5C6 13.5 6 14.432 6.65901 15.091C6.65901 15.091 7.31802 15.75 8.25 15.75H15.75C15.75 15.75 16.682 15.75 17.341 15.091C17.341 15.091 18 14.432 18 13.5V12.75C18 12.75 18 11.818 17.341 11.159C17.341 11.159 16.682 10.5 15.75 10.5H8.25C8.25 10.5 7.31802 10.5 6.65901 11.159C6.65901 11.159 6 11.818 6 12.75Z"
            fill="var(--primary-color)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 6C1.5 6 1.5 4.75736 2.37868 3.87868C2.37868 3.87868 3.25736 3 4.5 3C4.5 3 5.74264 3 6.62132 3.87868C6.62132 3.87868 7.22195 4.47931 7.41201 5.25H16.588C16.588 5.25 16.778 4.47931 17.3787 3.87868C17.3787 3.87868 18.2574 3 19.5 3C19.5 3 20.7426 3 21.6213 3.87868C21.6213 3.87868 22.5 4.75736 22.5 6V13.5C22.5 13.5 22.4979 14.843 21.9835 16.0822C21.9835 16.0822 21.469 17.3214 20.5202 18.2702C20.5202 18.2702 19.5714 19.219 18.3322 19.7335C18.3322 19.7335 17.093 20.2479 15.7512 20.25L8.25 20.25C8.25 20.25 6.90705 20.2479 5.6678 19.7335C5.6678 19.7335 4.42855 19.219 3.47977 18.2702C3.47977 18.2702 2.53098 17.3214 2.01654 16.0822C2.01654 16.0822 1.50209 14.843 1.5 13.5012V6ZM3 13.5C3 13.5 3.0038 15.6729 4.54043 17.2096C4.54043 17.2096 6.07747 18.7466 8.25 18.75L15.7488 18.75C15.7488 18.75 17.9225 18.7466 19.4596 17.2096C19.4596 17.2096 20.9966 15.6725 21 13.5V6C21 6 21 5.37868 20.5607 4.93934C20.5607 4.93934 20.1213 4.5 19.5 4.5C19.5 4.5 18.8787 4.5 18.4393 4.93934C18.4393 4.93934 18 5.37868 18 6C18 6.41421 17.6642 6.75 17.25 6.75H6.75C6.33579 6.75 6 6.41421 6 6C6 6 6 5.37868 5.56066 4.93934C5.56066 4.93934 5.12132 4.5 4.5 4.5C4.5 4.5 3.87868 4.5 3.43934 4.93934C3.43934 4.93934 3 5.37868 3 6V13.5Z"
            fill="var(--primary-color)"
          />
          <path
            d="M9.75 13.125C9.75 13.7463 9.24628 14.25 8.625 14.25C8.00372 14.25 7.5 13.7463 7.5 13.125C7.5 12.5037 8.00372 12 8.625 12C9.24628 12 9.75 12.5037 9.75 13.125Z"
            fill="var(--primary-color)"
          />
          <path
            d="M16.5 13.125C16.5 13.7463 15.9963 14.25 15.375 14.25C14.7537 14.25 14.25 13.7463 14.25 13.125C14.25 12.5037 14.7537 12 15.375 12C15.9963 12 16.5 12.5037 16.5 13.125Z"
            fill="var(--primary-color)"
          />
        </svg>
      ),
    },
    {
      label: 'Network Info',
      key: 'networkinfo',
      icon: <BsGlobe2 />,
      children: [
        { label: 'TOR Domain', key: 'tordomain' },
        { label: 'TOR URL', key: 'torurl' },
        { label: 'I2P Domain', key: 'i2p' },
        { label: 'Domain(DEEPWEB)', key: 'domaindeepweb' },
        { label: 'URL (DEEPWEB)', key: 'urldeepweb' },
        { label: 'Domain', key: 'domain' },
        { label: 'Domain(Suspicious)', key: 'domainsuspicious' },
        { label: 'URL', key: 'url' },
        { label: 'IP', key: 'ip' },
      ],
    },
    {
      label: 'File Info',
      key: 'fileinfo',
      icon: <VscFile />,
      children: [
        { label: 'Image', key: 'image', icon: '' },
        { label: 'Document', key: 'document', icon: '' },
        { label: 'Other File', key: 'otherfile', icon: '' },
      ],
    },
    {
      label: 'Leaked Info',
      key: 'leakedinfo',
      icon: <IoDocumentLockOutline />,
      children: [
        { label: 'Leaked Email', key: 'leakedemail', icon: '' },
        { label: 'Leaked Document', key: 'leakeddocument', icon: '' },
      ],
    },
    {
      label: 'SNS Info',
      key: 'snsinfo',
      icon: <BiMessageRoundedDots />,
      children: [
        { label: 'Instagram', key: 'instagram', icon: '' },
        { label: 'Facebook', key: 'facebook', icon: '' },
      ],
    },

    {
      label: 'External Search Info',
      key: 'externalsearchinfo',
      icon: <HiOutlineUserGroup />,
      children: [{ label: 'Google Search', key: 'googlesearch', icon: '' }],
    },
  ];

  const getMappedMenu = (menu) => {
    return menu.map((item) => {
      return {
        label: (
          <div className=" flex justify-between items-center self-center align-middle content-center">
            <span>{item.label}</span>
            {nodeInfo && nodeInfo.data ? (
              nodeInfo.data[item.key]?.length > 200 ? (
                <span className=" w-15 h-10 grid place-content-center p-2 text-white bg-slate-400 rounded-lg">
                  200+
                </span>
              ) : !nodeInfo.data[item.key]?.length ? null : (
                <span className=" w-15 h-10 grid place-content-center p-2 text-white bg-slate-400 rounded-lg">
                  {nodeInfo.data[item.key]?.length}
                </span>
              )
            ) : null}
          </div>
        ),

        key: item.key,
        icon: item.icon,
        children: item.children ? getMappedMenu(item.children) : undefined,
      };
    });
  };

  return (
    <div>
      <Button
        onClick={toggleCollapsed}
        className=" relative right-0 mt-5 ml-5 flex justify-start collapse-sidebar_btn"
      >
        {collapsed ? (
          <MdOutlineKeyboardArrowRight size={25} />
        ) : (
          <MdOutlineKeyboardArrowLeft size={25} />
        )}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme={mode ? 'light' : 'dark'}
        onClick={(e) => setActiveMenu(e.key)}
        inlineCollapsed={collapsed}
        items={getMappedMenu(menu)}
      />
    </div>
  );
};

export default Sidenav;
