import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReviewBreakdown from './ReviewBreakdown.jsx';

it('Renders bars based on number of ratings', () => {
  const reviews = {1: 25, 2: 10, 3: 50, 4: 70, 5: 100};
  const app = render(<ReviewBreakdown breakdown={reviews}/>);

  expect(document.querySelector('#progress-5-star')).toHaveAttribute('value', '100');

  expect(document.querySelector('#progress-4-star')).toHaveAttribute('value', '70');

  expect(document.querySelector('#progress-3-star')).toHaveAttribute('value', '50');

  expect(document.querySelector('#progress-2-star')).toHaveAttribute('value', '10');

  expect(document.querySelector('#progress-1-star')).toHaveAttribute('value', '25');
});