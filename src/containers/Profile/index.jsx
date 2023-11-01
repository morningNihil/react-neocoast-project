import React from 'react';
import { useAuth } from '../../contexts/AuthContext.js';
import getGravatar from '/home/facu/react-neocoast-project/build-utils/gravatar.js';
import capitalizeFirstLetter from '/home/facu/react-neocoast-project/build-utils/capitalizeFirstLetter.js';

import './styles.scss';

const Profile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null; // we can add a loading spinner here
  }

  return (
    <div className="content-container">
      <div className="user-profile">
        <img
          className="user-profile__avatar"
          src={getGravatar(currentUser.email) || ''}
          alt={`${currentUser.name.firstname}'s profile`}
        />
        <h2 className="user-profile__name">
          {capitalizeFirstLetter(currentUser.name.firstname)}
        </h2>
        <p className="user-profile__username">
          @{currentUser.username}
        </p>
        <p className="user-profile__bio">{currentUser.bio}</p>
        <div className="user-profile__details">
          <p>Email: {currentUser.email}</p>
          <p className="user-profile__details__location">Location </p>
          <p>City: {currentUser.address.city}</p>
          <p>Street: {currentUser.address.street}</p>
          <p>Number: {currentUser.address.number}</p>
          <p>Zipcode: {currentUser.address.zipcode}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
