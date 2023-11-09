import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext.js';
import { getAllCarts } from '../../api/carts.js';
import getAllUsers from '../../api/users.js';
import capitalizeFirstLetter from '/home/facu/react-neocoast-project/build-utils/capitalizeFirstLetter.js';
import Spinner from 'Components/Spinner';
import ErrorPage from 'Containers/ErrorView';

import './styles.scss';

const GiftView = () => {
  const [carts, setCarts] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      if (!currentUser) return;
      try {
        const usersData = await getAllUsers();
        const cartData = await getAllCarts();
        const cartFilter = cartData.data.filter(
          (cart) => cart.userId !== currentUser.id,
        );
        setCarts(cartFilter);
        setUsers(usersData.data);
      } catch (error) {
        console.log('Error', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorPage
        message={
          error.message || 'An error occurred while fetching data'
        }
      />
    );
  }

  return (
    <div className="gift-view">
      <h1>List of Carts</h1>
      <ul>
        {carts.map((cart) => {
          const cartUser = users.find(
            (user) => user.id === cart.userId,
          );
          return (
            <li key={cart.id}>
              <span className="gift-view__name-icon">
                <i className="fa-regular fa-address-card gift-view__icon"></i>
                <span className="gift-view__name">
                  {`${capitalizeFirstLetter(
                    cartUser.name.firstname,
                  )} ${capitalizeFirstLetter(
                    cartUser.name.lastname,
                  )}`}
                </span>
              </span>
              <span className="gift-view__product-count">
                🛒 Total Products: {cart.products.length}
              </span>
              <Link to={`/cart/${cart.id}`}>
                <button className="gift-view__button">Gift</button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GiftView;
