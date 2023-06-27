import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ReactComponent as Bug } from '../images/svg/bug.svg';

const Notication = () => {
  const items = [
    {
      message: 'You have a bug that needs to......',
    },
    {
      message: 'You have a bug that needs to......',
    },
    {
      message: 'You have a bug that needs to......',
    },
    {
      message: 'You have a bug that needs to......',
    },
    {
      message: 'You have a bug that needs to......',
    },
    {
      message: 'You have a bug that needs to......',
    },
  ];
  return (
    <div>
      <span className="noti">
        <article className="noti-data">
          <h2>Notifications</h2>
          {items.map((el) => (
            <section className="notification-sections">
              <p className="notifications">
                <Bug style={{ fill: 'var(--primary-color)' }} />
                &#160; {el.message}
              </p>
              {/* <p className="datestamp">5m ago</p> */}
            </section>
          ))}

          <section className="delete-noti-btn">
            <span className="noti-icon-delete">
              <RiDeleteBinLine />
            </span>
            <h4 className="clear-noti">Clear Notification</h4>
          </section>
        </article>
        <div className="noti-triangle"></div>
      </span>
    </div>
  );
};

export default Notication;
