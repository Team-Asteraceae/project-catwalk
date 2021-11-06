import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingsAndReviews from './index.jsx';

it('displays all modules', () => {
  const app = render(<RatingsAndReviews/>);

  expect(document.querySelector('.review-sort'))
    .toBeInTheDocument();

  expect(document.querySelector('.review-list'))
    .toBeInTheDocument();

  expect(document.querySelector('.review-breakdown'))
    .toBeInTheDocument();

  expect(document.querySelector('.product-breakdown'))
    .toBeInTheDocument();
  expect(document.querySelector
  ('.review-tile'))
    .toBeInTheDocument();
});

