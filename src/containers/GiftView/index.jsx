import './styles.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCarts } from '../../api/carts.js';
import getAllUsers from '../../api/users.js';
import { useAuth } from '../../contexts/AuthContext.js';
import Spinner from 'Components/Spinner';
import capitalizeFirstLetter from '/home/facu/react-neocoast-project/build-utils/capitalizeFirstLetter.js';

const GiftView = () => {
  const [carts, setCarts] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const usersData = await getAllUsers();
        const cartData = await getAllCarts();
        const cartFilter = cartData.data.filter(
          (cart) => cart.userId !== currentUser.id,
        );
        setCarts(cartFilter);
        setUsers(usersData.data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          'An error occurred while fetching carts:',
          error,
        );
      }
    };

    fetchData();
  }, [currentUser]);

  if (isLoading) {
    return <Spinner />;
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
