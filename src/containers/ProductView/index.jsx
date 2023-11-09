import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Spinner from 'Components/Spinner';

import {
  getAllProducts,
  getProductById,
} from '../../api/products.js';
import ProductCard from 'Components/ProductCard';
import ErrorPage from 'Containers/ErrorView';

import './styles.scss';

const ProductView = () => {
  const { id } = useParams();
  const [productToDisplay, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productData = await getProductById(id);

        setProduct(productData.data);
      } catch (error) {
        console.log('Error', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const { title, image, description, price, rating, category } =
    productToDisplay || {};
  return (
    <div className="product-container">
      <ProductCard
        key={id}
        id={id}
        title={title}
        image={image}
        description={description}
        price={price}
        rating={rating || {}}
        category={category}
      />
    </div>
  );
};

export default ProductView;
