import React, { useState } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ROUTES } from 'Data/constants';
import { useAuth } from '../../contexts/AuthContext.js';
import capitalizeFirstLetter from '/home/facu/react-neocoast-project/build-utils/capitalizeFirstLetter.js';

import './styles.scss';

const TopBar = ({ logo, routes }) => {
  const { currentUser, logout } = useAuth();
  const isLoggedIn = !!currentUser;
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
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
            if (
              (label === 'Profile' ||
                label === 'Cart' ||
                label === 'Gift') &&
              !isLoggedIn
            ) {
              return null;
            }
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
            <li className="user-dropdown" onClick={toggleDropdown}>
              <span className="user-name">
                {capitalizeFirstLetter(currentUser.name.firstname)}
              </span>

              {isDropdownVisible && (
                <ul className="user-dropdown__menu">
                  <li>
                    <NavLink to={ROUTES.profile}>Profile</NavLink>
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

TopBar.propTypes = {
  logo: PropTypes.string,
  routes: PropTypes.array.isRequired,
};

export default TopBar;
