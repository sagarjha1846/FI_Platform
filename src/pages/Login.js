import React, { useEffect, useState } from 'react';
import '../css/login.css';
import users from '../images/user.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../store/features/auth/authSlice';
import CommonHeader from '../components/CommonHeader';

const Login = ({ mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const { isError, isSuccess, message, token } = useSelector(
    (state) => state.auth,
  );

  const Navigate = useNavigate();
  function handleforgetpassword() {
    Navigate('/forgot-password');
  }
  function loggingIn(event) {
    event.preventDefault();
    dispatch(login({ username: email, password }));
  }

  //tracking error and success
  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (token || isSuccess) {
      const arrowSvg = document.querySelector('.login-svg');
      arrowSvg?.classList.add('login-animation');
      const apiCall = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('foo');
        }, 3000);
      });

      apiCall.then(() => {
        arrowSvg?.classList.toggle('login-animation');
        // const checkMark = document.querySelector('.check-mark');
        // checkMark.style.display = 'revert';
      });
      Navigate('/');
    }
    dispatch(reset());
  }, [token, isError, isSuccess, message, dispatch, Navigate]);

  const remember = () => {
    localStorage.setItem('username', email);
    localStorage.setItem('Password', password);
  };

  return (
    <div className="App">
      <main className="login-container">
        <CommonHeader mode={mode} setMode={setMode} />

        <section className="form-login">
          <h3 className="welcome-back">Welcome back</h3>
          <h4 className="login-credentials-heading">
            Please enter your login credentials.
          </h4>
          <p className="email-address">Email address</p>
          <input
            className="input input-1"
            placeholder="name@company.com"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="password">Password</p>
          <input
            className="input-2 input"
            placeholder="*********"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          {error && <div className="login-error"> {error} </div>}
          <span className="login-checkbox">
            <div className="remember-me">
              <input
                className="remember-checkbox"
                type="checkbox"
                onClick={remember}
              />
              <div className="checkmark"></div>Remember me
            </div>
            <span onClick={handleforgetpassword} className="forgot-password">
              Forgot password
            </span>
          </span>

          <button className="login-button-slide" onClick={loggingIn}>
            Sign In
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
          <p className="contact-us">
            Don't have an account ?{' '}
            <a
              href="https://fridayintel.com/contact/"
              target="_blank"
              rel="noreferrer"
            >
              {' '}
              Contact Us
            </a>
          </p>
        </section>
        <footer className="footer-login">
          &copy; 2023-24 Friday Intel LLP
        </footer>
      </main>
      <aside className="user-img">
        <img src={users} alt="user " className="user-image" />
      </aside>
    </div>
  );
};

export default Login;
