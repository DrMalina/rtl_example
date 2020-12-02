import React from 'react';
import { OrderSummary } from './OrderSummary';
import { Loader } from '../shared/Loader';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('../shared/Loader', () => ({
  Loader: jest.fn(() => null),
}));

describe('OrderSummary', () => {
  afterEach(jest.clearAllMocks);

  describe('while order data being loaded', () => {
    it('renders loader', () => {
      const stubUseOrder = () => ({
        isLoading: true,
        order: undefined,
      });

      render(<OrderSummary useOrderHook={stubUseOrder} />);
      expect(Loader).toHaveBeenCalled();
    });
  });

  describe('when order is loaded', () => {
    const stubUseOrder = () => ({
      isLoading: false,
      order: {
        products: [
          {
            name: 'Product foo',
            price: 10,
            image: 'image.png',
          },
        ],
      },
    });

    it('renders order info', () => {
      renderWithRouter(() => <OrderSummary useOrderHook={stubUseOrder} />);

      expect(screen.getByRole('listitem')).toHaveTextContent('Product foo');
    });

    it('navigates to main page on button click', () => {
      const { history } = renderWithRouter(() => (
        <OrderSummary useOrderHook={stubUseOrder} />
      ));

      userEvent.click(
        screen.getByRole('button', { name: /back to the store/i })
      );
      expect(history.location.pathname).toEqual('/');
    });
  });

  describe('without order', () => {
    it('renders error message', () => {
      const stubUseOrder = () => ({
        isLoading: false,
        order: undefined,
      });

      render(<OrderSummary useOrderHook={stubUseOrder} />);

      expect(screen.getByText("Couldn't load order info.")).toBeInTheDocument();
    });
  });
});
