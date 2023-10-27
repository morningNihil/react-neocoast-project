import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from 'Components/TopBar';

import './styles.scss';

const Layout = () => {
  return (
    <div className="layout">
      <TopBar
        routes={[
          { label: 'Home', route: '/' },
          { label: 'Login', route: '/login' },
        ]}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
