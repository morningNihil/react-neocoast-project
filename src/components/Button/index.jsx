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

Button.propTypes = {
  isDisabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
