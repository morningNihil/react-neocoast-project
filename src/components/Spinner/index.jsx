import React from 'react';

import { BeatLoader } from 'react-spinners';

import './styles.scss';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <BeatLoader color={'#d2d0ca'} size={15} margin={2} />
    </div>
  );
};

export default Spinner;
