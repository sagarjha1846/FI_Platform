import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../css/forgetpage.css';
import constants from '../constant/routesConstant';
import forgetpassimg from '../images/forgetpass.jpeg';
import CommonHeader from '../components/CommonHeader';

const ForgetPassword = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const { ROUTES } = constants;

  return (
    <div className="App">
      <Helmet>
        <title>FridayIntel-ForgetPassword</title>
      </Helmet>
      <main className="login-container">
        <CommonHeader mode={mode} setMode={setMode} />

        <section className="form">
          <h3 className="Forgot-Password">Forgot Password</h3>
          <h4 className="login-credentials-heading-for">
            Please enter registered Email/Mobile number to request password.
          </h4>
          <p className="email-address">Email address</p>
          <input
            className="input-fp"
            placeholder="name@company.com"
            type="email"
          />
          <br></br>
          <button className="login-button-slide-fp">
            Reset Password
            <div className="iconbtn">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>

          <p className="contact-uss">
            Wanna try again?{' '}
            <span onClick={() => navigate(ROUTES.login)}> Log in</span>
          </p>
        </section>
        <div className="copy_right_text">&copy; 2023-24 Friday Intel LLP</div>
      </main>
      <aside className="user-img-forget">
        <img src={forgetpassimg} alt="user " className="user-image" />
      </aside>
    </div>
  );
};

export default ForgetPassword;
