import React from 'react';
import { render } from '@testing-library/react';
import Header from './index';
import renderer from 'react-test-renderer';

test('renders app title', () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/Recipes/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header correctly', () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

