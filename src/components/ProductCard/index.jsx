import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

const ProductCard = ({
  id,
  title,
  image,
  description,
  price,
  rating,
  category,
  showProductDetails = true,
}) => {
  return (
    <Link className="product-card" to={`/product/${id}`}>
      <img src={image} alt={title} className="product-card__image" />
      <div className="product-card__info">
        <h2 className="product-card__title">{title}</h2>

        {showProductDetails && (
          <div className="product-card__show-details">
            <p className="product-card__description">{description}</p>
            <p className="product-card__description">
              Rating: {rating.rate} (from {rating.count} reviews)
            </p>
            <p className="product-card__description">
              Category: {category}
            </p>
          </div>
        )}
      </div>
      <p className="product-card__price">${price}</p>{' '}
      <button className="product-card__action">Add to Cart</button>
    </Link>
  );
};

ProductCard.propTypes = {
  showProductDetails: PropTypes.bool,
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.object,
  category: PropTypes.string,
};

export default ProductCard;
