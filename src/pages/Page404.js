import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../css/page404.css';
const Page404 = () => {
  return (
    <div className="main">
      <Helmet>
        <title>FridayIntel-Page404</title>
      </Helmet>
      <h1 className="oops">Oops!</h1>
      <h5>The page you were looking for doesn’t exist.</h5>
      <div className="section404">
        <span className="error404">404</span>
        <span className="error">ERROR</span>
        <Link to="/">
          <button className="redirect-btn">Back To Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
