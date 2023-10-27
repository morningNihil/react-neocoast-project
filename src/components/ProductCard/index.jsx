import React from 'react';
import './styles.scss';

const ProductCard = ({ id, title, image, description, price }) => {
  return (
    <div className="product-card" key={id}>
      <img src={image} alt={title} className="product-card__image" />
      <div className="product-card__info">
        <h2 className="product-card__title">{title}</h2>
        <p className="product-card__description">{description}</p>
        <p className="product-card__price">${price}</p>{' '}
        <button className="product-card__action">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
