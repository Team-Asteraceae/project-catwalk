import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import api from './api';

// Get product ID from URL
let idString = window.location.pathname;
if (idString.startsWith('/')) {
  idString = idString.substring(1);
}
let productId;
// For testing purposes only, default to product #40344
if (idString === '') {
  productId = 40344;
  window.history.replaceState({}, null, `/${productId}`);
} else {
  productId = Number(idString);
}

// These will be filled in asynchronously
let info = null;
let related = [];
let reviews = [];

// Whenever one of the above changes, re-render the app
const renderApp = () => {
  if (info !== null) { // Don't render if we don't have a product yet!
    ReactDOM.render(
      <React.StrictMode>
        <App info={info} related={related} reviews={reviews}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
};

// Asynchronously retrieve product info and then re-render
api.getProduct(productId).then(apiInfo => {
  info = apiInfo;
  renderApp();
});
// Asynchronously retrieve reviews and then re-render
api.getReviews(productId).then(apiReviews => {
  reviews = apiReviews;
  renderApp();
});
// Asynchronously retrieve related items and then re-render
api.getRelated(productId).then(apiRelated => {
  related = apiRelated;
  renderApp();
});
