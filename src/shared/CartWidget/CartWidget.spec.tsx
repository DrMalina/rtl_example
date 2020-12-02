import React from 'react';
import { CartWidget } from './CartWidget';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('CartWidget', () => {
  it('shows the amount of products in the cart', () => {
    const stubCartHook = () => ({
      products: [{ name: 'Product A', price: 0, image: 'image.png' }],
    });

    renderWithRouter(() => <CartWidget useCartHook={stubCartHook} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('navigates to cart summary page on click', () => {
    const { history } = renderWithRouter(() => <CartWidget />);

    userEvent.click(screen.getByRole('link'));
    expect(history.location.pathname).toEqual('/cart');
  });
});
