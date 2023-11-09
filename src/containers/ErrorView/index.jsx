import React from 'react';

import Button from 'Components/Button';
import notFound from '/home/facu/react-neocoast-project/src/assets/not_found.jpg';

import './styles.scss';

const ErrorPage = ({ message }) => (
  <div className="error-page">
    <h1>The route doesn&apos;t exist</h1>
    <p>{message}</p>
    <Button
      className="button-login"
      onClick={() => window.location.reload(false)}
      name="Try Again"
    />
    <img
      className="error-page__image"
      src={notFound}
      alt="not found"
    />
  </div>
);

export default ErrorPage;
