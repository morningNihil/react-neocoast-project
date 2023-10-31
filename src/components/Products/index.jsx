import React from 'react';
import ProductCard from 'Components/ProductCard';

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

export default ProductList;
