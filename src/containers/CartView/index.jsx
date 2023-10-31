import React, { useState, useEffect } from 'react';
import { getAllCarts } from '../../api/carts.js';
import { getProductById } from '../../api/products.js';
import { useAuth } from '../../contexts/AuthContext.js';
import './styles.scss';
import CartCard from 'Components/Cart';
import Button from 'Components/Button';
import { useNavigate } from 'react-router-dom';

const CartView = () => {
  const [carts, setCarts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  console.log('Current user:', currentUser);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const cartData = await getAllCarts();

        const sortedCarts = cartData.data
          .filter((cart) => cart.userId === currentUser.id)
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // sort the carts to only show the recent one in the case of johnd

        const mostRecentCart = sortedCarts[0];
        if (!mostRecentCart || !mostRecentCart.products) return;

        setCarts(mostRecentCart);

        if (mostRecentCart) {
          const fetchedProductsData = [];
          for (let item of mostRecentCart.products) {
            const productData = await getProductById(item.productId);
            fetchedProductsData.push({
              ...productData.data,
              quantity: item.quantity,
            });
          }
          setProductsData(fetchedProductsData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          'An error occurred while fetching data:',
          error,
        );
      }
    };

    fetchData();
  }, [currentUser]);

  const handleBuy = () => {
    navigate('/');
  };

  if (isLoading) {
    return <p>Loading...</p>; // again I need to add an spinner here
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
      <div className="button-container">
        <Button
          name={'Buy'}
          className="button-cart"
          onClick={handleBuy}
        />
      </div>
    </div>
  );
};
export default CartView;
