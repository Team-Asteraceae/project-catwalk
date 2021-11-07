import React from 'react';
import { StarRating } from '../common';

const OutfitCard = (props) => {
  var image_url = '';
  var defaultPrice = 0;
  var salePrice = null;

  const removeFromOutfit = () => {
    props.remove(props.product);
  };

  for (var i = 0; i < props.styles.length; i++) {
    if (props.styles[i]['default?'] === true) {
      image_url = props.styles[i].photos[0].url;
      defaultPrice = props.styles[i].original_price;
      salePrice = props.styles[i].sale_price;
    }
  }

  const price = salePrice === null ? <div className="price">{'$' + defaultPrice}</div> :
    <div className="price-container">
      <div className="sale-price">{'$' + salePrice}</div>
      <div className="default-price">{'$' + defaultPrice}</div>
    </div>;

  return (
    <div className="card-item">
      <div className="product-image">
        <img src={image_url} width="250" height="250"></img>
        <div className="card-action-button" onClick={removeFromOutfit}>X</div>
      </div>
      <div className="category">
        {props.product.category.toUpperCase()}
      </div>
      <div className="product-name">
        {props.product.name}
      </div>
      {price}
      <div className="star-rating">
        <StarRating rating={props.rating} />
      </div>
    </div>
  );

};

export default OutfitCard;