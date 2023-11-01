import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from 'Components/TopBar';
import { ROUTES } from 'Data/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';

import './styles.scss';

const Layout = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!currentUser;
  // console.log('Is logged in:', isLoggedIn);
  // console.log('Current Path:', location.pathname);
  // console.log('Current User:', currentUser);

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
