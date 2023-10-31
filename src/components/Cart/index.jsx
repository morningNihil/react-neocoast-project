import React from 'react';
import './styles.scss';

const CartCard = ({ product }) => {
  return (
    <div className="cart-card">
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <img
        src={product.image}
        alt={product.title}
        className="cart-card__image"
      />
    </div>
  );
};

export default CartCard;
