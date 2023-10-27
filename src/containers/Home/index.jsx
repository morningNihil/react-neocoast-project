import React, { useEffect, useState } from 'react';
import ProductList from 'Components/Products';
import getAllProducts from '../../api/products.js';

import './index.scss';

const Home = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const products = await getAllProducts();

    setProducts(products.data);
    console.log(products.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home">
      <ProductList products={products} />
    </div>
  );
};

export default Home;
