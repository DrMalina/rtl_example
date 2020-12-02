import React from 'react';
import { CartItem } from './CartItem';
import { Product } from '../shared/types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CartItem', () => {
  const product: Product = {
    name: 'Product Foo',
    price: 100,
    image: '/image/source.png',
  };

  it('renders correctly', () => {
    renderWithRouter(() => (
      <CartItem product={product} removeFromCart={() => {}} />
    ));

    expect(screen.getByText('Product Foo')).toBeInTheDocument();
    expect(screen.getByText('100 Zm')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Product Foo/ })).toHaveAttribute(
      'src',
      '/image/source.png'
    );
  });

  describe("on 'Remove' click", () => {
    it('calls passed in function', () => {
      const removeFromCartMock = jest.fn();

      renderWithRouter(() => (
        <CartItem product={product} removeFromCart={removeFromCartMock} />
      ));

      userEvent.click(screen.getByRole('button', { name: /Remove/ }));
      expect(removeFromCartMock).toBeCalledWith(product);
    });
  });
});
