import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from 'Components/TopBar';
import { ROUTES } from 'Data/constants';

import './styles.scss';

const Layout = () => {
  return (
    <div className="layout">
      <TopBar
        routes={[
          { label: 'Home', route: ROUTES.home },
          { label: 'Login', route: ROUTES.login },
          { label: 'Profile', route: ROUTES.profile },
          { label: 'Cart', route: ROUTES.cart },
          { label: 'Gift', route: ROUTES.gift },
        ]}
      />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
