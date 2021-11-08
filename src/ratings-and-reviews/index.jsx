import React, {useState, useEffect} from 'react';
import './ratings-and-reviews.scss';
import StarRating from '../common/star-rating/index.jsx';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import Sort from './components/Sort.jsx';
import ReviewBreakdown from './components/ReviewBreakdown.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import AddReview from './components/AddReview.jsx';

import {reviews, metadata} from './sampleData.js';

/** @param {Object} reviews */
const reviewsTotal = (reviews) => {
  let total = 0;
  for (let i in reviews) {
    total += reviews[i];
  }
  return total;
};

/** @param {string} newSortType*/

const sortReviews = (newSortType) => {
  if (newSortType === 'Relevance') {

    filteredReviews.sort(function (review1, review2) {
      if (review1.date > review2.date) {
        return -1;
      } else if (review1.date < review2.date) {
        return 1;
      }
    });

    filteredReviews.sort(function (review1, review2) {
      if (review1.helpfulness > review2.helpfulness) {
        return -1;
      } else if (review1.helpfulness < review2.helpfulness) {
        return 1;
      }
    });

    return filteredReviews;

  } else if (newSortType === 'Newest') {
    return filteredReviews.sort(function (review1, review2) {
      if (review1.date > review2.date) {
        return -1;
      } else if (review1.date < review2.date) {
        return 1;
      }
    });

  } else if (newSortType === 'Most Helpful') {
    return filteredReviews.sort(function (review1, review2) {
      if (review1.helpfulness > review2.helpfulness) {
        return -1;
      } else if (review1.helpfulness < review2.helpfulness) {
        return 1;
      }
    });
  }
};

let filteredReviews = reviews;

const filterReviews = (starFilters) => {
  let reviewList = reviews;
  let filteredList = [];
  if (!starFilters.length) {
    filteredReviews = reviews;
    return;
  }

  for (let i = 0; i < starFilters.length; i++) {
    filteredList = filteredList.concat(reviewList.filter(review => review.rating === starFilters[i]));
  }
  filteredReviews = filteredList;
};

const recommendPercentage = (recommended) => {

  let total = recommended.true + recommended.false;

  return ((recommended.true / total) * 100).toFixed(0);
};


const RatingsAndReviews = () => {

  let [sortType, setSortType] = useState('Relevance');

  let [starFilters, setStarFilters] = useState([]);

  let [addView, setAddView] = useState(false);


  return (
    <div id="ratings-and-reviews">
      <div className="column-1">
        <h2 className="reviews-header">Ratings & Reviews</h2>
        <span className="reviews-rating">{metadata.rating.toFixed(1)}</span>
        <div>
          <StarRating rating={metadata.rating}/>
        </div>
        <span className="reviews-recommend">{recommendPercentage(metadata.recommended)}% of reviews recommend this product</span>
        <ReviewBreakdown breakdown={metadata.ratings} filterReviews={filterReviews} starFilters={starFilters} setStarFilters={setStarFilters}/>
        <ProductBreakdown />
      </div>
      <div className="column-2">
        <Sort breakdown={metadata.ratings} sortReviews={sortReviews} sortType={sortType} setSortType={setSortType}/>
        <ReviewList reviews={sortReviews(sortType)} filteredReviews={filterReviews(starFilters)} addView={addView} setAddView={setAddView}/>
        {addView && <AddReview characterisitics={metadata.characteristics} hide={() => setAddView(false)}></AddReview>}
      </div>
    </div>
  );
};

export {reviews, reviewsTotal};
export default RatingsAndReviews;
