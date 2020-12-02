import React from 'react';
import { Cart } from './Cart';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartItemProps } from './CartItem';

jest.mock('./CartItem', () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product;
    return (
      <h3>
        {name} {price} {image}
      </h3>
    );
  },
}));

describe('Cart', () => {
  describe('without products', () => {
    const stubCartHook = () => ({
      products: [],
      removeFromCart: () => {},
      totalPrice: () => 0,
    });

    it('renders empty cart message', () => {
      renderWithRouter(() => <Cart useCartHook={stubCartHook} />);
      expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    });

    describe("on 'Back to main page' click", () => {
      it("redirects to '/'", () => {
        const { history } = renderWithRouter(() => (
          <Cart useCartHook={stubCartHook} />
        ));

        userEvent.click(
          screen.getByRole('link', { name: /Back to main page./ })
        );

        expect(history.location.pathname).toBe('/');
      });
    });
  });

  describe('with products', () => {
    const products = [
      {
        name: 'Product foo',
        price: 100,
        image: '/image/foo_source.png',
      },
      {
        name: 'Product bar',
        price: 100,
        image: '/image/bar_source.png',
      },
    ];

    const stubCartHook = () => ({
      products,
      removeFromCart: () => {},
      totalPrice: () => 55,
    });

    it('renders cart products list with total price', () => {
      renderWithRouter(() => <Cart useCartHook={stubCartHook} />);

      const prod1 = screen.getByRole('heading', {
        name: 'Product foo 100 /image/foo_source.png',
      });
      const prod2 = screen.getByRole('heading', {
        name: 'Product bar 100 /image/bar_source.png',
      });
      const prod3 = screen.getByText('Total: 55 Zm');

      expect(prod1).toBeInTheDocument();
      expect(prod2).toBeInTheDocument();
      expect(prod3).toBeInTheDocument();
    });

    describe("on 'go to checkout' click", () => {
      it("redirects to '/checkout'", () => {
        const { history } = renderWithRouter(() => (
          <Cart useCartHook={stubCartHook} />
        ));

        userEvent.click(screen.getByRole('button', { name: /Go to checkout/ }));
        expect(history.location.pathname).toBe('/checkout');
      });
    });
  });
});
