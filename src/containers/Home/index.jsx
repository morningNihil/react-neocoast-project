import React, { useEffect, useState } from 'react';
import ProductList from 'Components/Products';
import {
  getAllProducts,
  getProductById,
} from '../../api/products.js';
import getAllCategories from '../../api/categories.js';
import Spinner from 'Components/Spinner';
import './index.scss';
import capitalizeFirstLetter from '/home/facu/react-neocoast-project/build-utils/capitalizeFirstLetter.js';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getAllProducts();
        const categoriesData = await getAllCategories();

        setProducts(productsData.data);
        setCategories(categoriesData.data);
        setIsLoading(false);
      } catch (error) {
        console.error(
          'An error occurred while fetching data:',
          error,
        );
      }
    };

    fetchData();
  }, []);

  const filteredProducts = filter
    ? products.filter((product) => product.category === filter)
    : products;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="home">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {capitalizeFirstLetter(category)}
          </option>
        ))}
      </select>
      <div>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default Home;
