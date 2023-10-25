import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Button = ({ isDisabled = false, name, onClick, className }) => (
  <button
    disabled={isDisabled}
    onClick={(event) => {
      event.preventDefault();

      onClick();
    }}
    className={className}>
    {name}
  </button>
);

export default Button;
