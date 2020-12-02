import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import { Product } from '../shared/types';

describe('ProductCard', () => {
  const product: Product = {
    name: 'Product A',
    price: 55,
    image: '/test.jpg',
  };

  it('renders correctly', () => {
    render(<ProductCard datum={product} />);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('55 Zm')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /goblin/ })).toHaveAttribute(
      'src',
      '/test.jpg'
    );
  });

  describe('when product is in the cart', () => {
    it("the 'Add to cart' button is disabled", () => {
      const mockUseCartHook = () => ({
        addToCart: () => {},
        products: [product],
      });

      render(
        <ProductCard datum={product} useCartHook={mockUseCartHook as any} />
      );
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('when product is not in the cart', () => {
    describe("on 'Add to cart' click", () => {
      it("calls 'addToCart' function", () => {
        const addToCart = jest.fn();
        const mockUseCartHook = () => ({
          addToCart,
          products: [],
        });

        render(<ProductCard datum={product} useCartHook={mockUseCartHook} />);

        userEvent.click(screen.getByRole('button', { name: /Add to cart/ }));
        expect(addToCart).toHaveBeenCalledWith(product);
      });
    });
  });
});
