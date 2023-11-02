import React, { useEffect } from 'react';

import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { ROUTES } from 'Data/constants';
import TopBar from 'Components/TopBar';
import { useAuth } from '../../contexts/AuthContext.js';

import logo from '/home/facu/react-neocoast-project/src/assets/logo2.png';

import './styles.scss';

const Layout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!currentUser;

  useEffect(() => {
    // add a timeout or change with spinner + timeout so it doesn't redirect inmediately to home since right now is redirecting before it can check the auth state
    if (
      !isLoggedIn &&
      [ROUTES.profile, ROUTES.cart, ROUTES.gift].includes(
        location.pathname,
      )
    ) {
      navigate('/');
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <div className="layout">
      <TopBar
        logo={logo}
        routes={[
          { label: 'Login', route: ROUTES.login },
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
