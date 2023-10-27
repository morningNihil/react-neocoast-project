import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const TopBar = ({ logo, routes }) => (
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
        {routes.map(({ label, route }) => (
          <li key={label}>
            <NavLink to={route}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default TopBar;
