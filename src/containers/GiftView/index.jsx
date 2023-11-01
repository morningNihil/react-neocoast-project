import './styles.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCarts } from '../../api/carts.js';
import { useAuth } from '../../contexts/AuthContext.js';

const GiftView = () => {
  const [carts, setCarts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const cartData = await getAllCarts();
        const cartFilter = cartData.data.filter(
          (cart) => cart.userId !== currentUser.id,
        );
        setCarts(cartFilter);
      } catch (error) {
        console.error(
          'An error occurred while fetching carts:',
          error,
        );
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <div className="gift-view">
      <h1>List of Carts</h1>
      <ul>
        {carts.map((cart) => (
          <li key={cart.id}>
            <Link to={`/cart/${cart.id}`}>
              Cart ID: {cart.id} | Date: {cart.date} | Total Products:{' '}
              {cart.products.length}
              <button className="gift-button">Gift</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GiftView;
