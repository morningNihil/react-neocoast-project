import React from 'react';

import PropTypes from 'prop-types';

import ProductCard from 'Components/ProductCard';

import './styles.scss';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          description={product.description}
          price={product.price}
          rating={product.rating || {}}
          category={product.category}
          showProductDetails={false}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductList;
