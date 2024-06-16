// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

const Home = () => {
  return (
    <div className={'container'}>
      <h1 className={'header'}>Dynamic Forms Application</h1>
      <div className={'buttonContainer'}>
        <Link to="/form/A" className={'button'}>Form A</Link>
        <Link to="/form/B" className={'button'}>Form B</Link>
        <Link to="/data" className={'button'}>Data</Link>

      </div>
    </div>
  );
};

export default Home;
