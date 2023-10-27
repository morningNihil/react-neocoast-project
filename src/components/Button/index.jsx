import React from 'react';

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
