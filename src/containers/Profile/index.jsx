import React, { useEffect, useState } from 'react';
import getAllUsers from '../../api/users.js';
import { useAuth } from '../../contexts/AuthContext.js';
import getGravatar from '/home/facu/react-neocoast-project/build-utils/gravatar.js';
import capitalizeFirstLetter from '/home/facu/react-neocoast-project/build-utils/capitalizeFirstLetter.js';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const Profile = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = !!currentUser;

  const fetchData = async () => {
    try {
      const users = await getAllUsers();

      setUsers(users.data);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // repeat this for cart, gift

    if (!isLoggedIn) {
      navigate('/');
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const profileUser = users.find(
    (user) => user.username === currentUser.username,
  );

  if (!profileUser) return <p>User not found</p>;

  console.log(profileUser);
  console.log(profileUser);

  return (
    <div className="content-container">
      <div className="user-profile">
        <img
          className="user-profile__avatar"
          src={getGravatar(profileUser.email) || ''}
          alt={`${profileUser.name.firstname}'s profile`}
        />
        <h2 className="user-profile__name">
          {capitalizeFirstLetter(profileUser.name.firstname)}
        </h2>
        <p className="user-profile__username">
          @{profileUser.username}
        </p>
        <p className="user-profile__bio">{profileUser.bio}</p>
        <div className="user-profile__details">
          <p>Email: {profileUser.email}</p>
          <p>Location </p>
          <p>City: {profileUser.address.city}</p>
          <p>Street: {profileUser.address.street}</p>
          <p>Number: {profileUser.address.number}</p>
          <p>Zipcode: {profileUser.address.zipcode}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
