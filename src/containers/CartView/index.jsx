import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { getAllCarts, getCartById } from '../../api/carts.js';
import { getProductById } from '../../api/products.js';
import { useAuth } from '../../contexts/AuthContext.js';
import CartCard from 'Components/Cart';
import Button from 'Components/Button';
import Spinner from 'Components/Spinner';
import ErrorPage from 'Containers/ErrorView';

import './styles.scss';

const CartView = ({}) => {
  const [carts, setCarts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { cartId } = useParams();
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      if (!currentUser) return;
      try {
        let cartToProcess;

        // If selectedCartId is provided, fetch that cart
        if (cartId) {
          const cartData = await getCartById(cartId);
          cartToProcess = cartData.data;
        } else {
          // Otherwise, fetch the most recent cart for the user
          const allCartsData = await getAllCarts();
          const sortedCarts = allCartsData.data
            .filter((cart) => cart.userId === currentUser.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          cartToProcess = sortedCarts[0];
        }

        if (!cartToProcess || !cartToProcess.products) return;
        setCarts(cartToProcess);

        const fetchedProductsData = [];
        for (let item of cartToProcess.products) {
          const productData = await getProductById(item.productId);
          fetchedProductsData.push({
            ...productData.data,
            quantity: item.quantity,
          });
        }
        setProductsData(fetchedProductsData);
      } catch (error) {
        console.log('Error', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser, cartId]);

  const handleBuy = () => {
    navigate('/');
  };

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
    <div className="cart-view">
      {productsData.map((product) => (
        <CartCard
          key={product.id}
          product={product}
          quantity={product}
        />
      ))}
      <div className="cart-view__button-container">
        <Button
          name={'Buy'}
          className="cart-view__button-cart"
          onClick={handleBuy}
        />
      </div>
    </div>
  );
};
export default CartView;
