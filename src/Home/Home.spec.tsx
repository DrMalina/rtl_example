import React from 'react';
import { Home } from './Home';
import { Category } from '../shared/types';
import { render, screen } from '@testing-library/react';
import { ProductCardProps } from './ProductCard';

jest.mock('./ProductCard', () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum;
    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

describe('Home', () => {
  describe('while loading', () => {
    it('renders loader', () => {
      const mockUseProducts = () => ({
        categories: [],
        isLoading: true,
        error: false,
      });

      render(<Home useProductsHook={mockUseProducts} />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    const category: Category = {
      name: 'Category A',
      items: [
        {
          name: 'Product A',
          price: 55,
          image: '/test.jpg',
        },
      ],
    };

    it('renders categories with products', () => {
      const mockUseProducts = () => ({
        categories: [category],
        isLoading: false,
        error: false,
      });

      render(<Home useProductsHook={mockUseProducts} />);
      expect(
        screen.getByRole('heading', { name: /Category A/ })
      ).toBeInTheDocument();
      expect(screen.getByText('Product A 55 /test.jpg')).toBeInTheDocument();
    });
  });

  describe('with error', () => {
    it('renders error message', () => {
      const mockUseProducts = () => ({
        categories: [],
        isLoading: false,
        error: true,
      });

      render(<Home useProductsHook={mockUseProducts} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});
