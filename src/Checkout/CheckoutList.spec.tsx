import React from 'react';
import { CheckoutList } from './CheckoutList';
import { Product } from '../shared/types';
import { render, screen } from '@testing-library/react';

describe('CheckoutList', () => {
  it('renders list of products', () => {
    const products: Product[] = [
      {
        name: 'Product foo',
        price: 10,
        image: '/image.png',
      },
      {
        name: 'Product bar',
        price: 10,
        image: '/image.png',
      },
    ];

    render(<CheckoutList products={products} />);
    expect(screen.getByText('Product foo')).toBeInTheDocument();
    expect(screen.getByText('Product bar')).toBeInTheDocument();
  });
});
