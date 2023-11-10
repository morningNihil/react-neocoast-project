import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';

import { ROUTES } from 'Data/constants';

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
  const navigate = useNavigate();

  const handleAddToCartClick = () => {
    navigate(ROUTES.home);
  };

  return (
    <Link className="product-card" to={`/product/${id}`}>
      <img src={image} alt={title} className="product-card__image" />
      <div className="product-card__info">
        <h2 className="product-card__title">{title}</h2>

        {showProductDetails && (
          <div className="product-card__show-details">
            <p className="product-card__description">{description}</p>
            <p className="product-card__description">
              <i
                className="fa-regular fa-star star_icon"
                style={{ color: 'black', fontSize: '12px' }}></i>
              Rating: {rating.rate} (from {rating.count} reviews)
            </p>
            <p className="product-card__description">
              Category: {category}
            </p>
          </div>
        )}
      </div>
      <p className="product-card__price">${price}</p>{' '}
      {showProductDetails && (
        <button
          className="product-card__action"
          onClick={handleAddToCartClick()}>
          Add to Cart
        </button>
      )}
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
