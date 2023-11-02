import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import {
  getAllProducts,
  getProductById,
} from '../../api/products.js';
import ProductCard from 'Components/ProductCard';

import './styles.scss';

const ProductView = () => {
  const { id } = useParams();
  const [productToDisplay, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);

        setProduct(productData.data);
      } catch (error) {
        console.error(
          'An error occurred while fetching data:',
          error,
        );
      }
    };

    fetchData();
  }, []);

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
