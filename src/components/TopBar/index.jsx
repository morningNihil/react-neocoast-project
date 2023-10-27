import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

const TopBar = ({ logo, routes }) => {
  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="top-bar">
      <div className="top-bar__logo">
        {typeof logo === 'string' ? (
          <img src={logo} alt="Logo" />
        ) : (
          logo
        )}
      </div>
      <nav className="top-bar__nav">
        <ul>
          {routes.map(({ label, route }) => {
            if (label === 'Login' && isLoggedIn) {
              return null;
            }
            return (
              <li key={label}>
                <NavLink to={route}>{label}</NavLink>
              </li>
            );
          })}
          {isLoggedIn && (
            <li
              key="logout"
              onClick={handleLogout}
              className="nav-item-logout">
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default TopBar;
