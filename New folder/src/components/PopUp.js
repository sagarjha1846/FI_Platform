import React, { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { BsGlobe2 } from 'react-icons/bs';
import '../css/PopUp.css';
function PopUp() {
  const [popup, setPop] = useState(false);
  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };
  return (
    <div>
      <button onClick={handleClickOpen}>.</button>
      <div>
        {popup ? (
          <div className="main">
            <div className="popup">
              <div className="popup-header">
                <div>
                  <BsGlobe2 />
                  <h1>popup</h1>
                </div>
                <button onClick={closePopup}>
                  {' '}
                  <ImCancelCircle />
                </button>
              </div>
              <div>
                <p>This is simple popup in React js</p>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default PopUp;
