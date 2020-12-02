import React from 'react';
import { App } from './App';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

jest.mock('./Home', () => ({ Home: () => <h2>Home</h2> }));
jest.mock('./Cart', () => ({ Cart: () => <h2>Cart</h2> }));
jest.mock('./Checkout', () => ({
  Checkout: () => <h2>Checkout</h2>,
}));
jest.mock('./OrderSummary', () => ({
  OrderSummary: () => <h2>Order summary</h2>,
}));

describe('App', () => {
  it('renders successfully', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(
      screen.getByRole('heading', { name: /Goblin Store/ })
    ).toBeInTheDocument();
  });

  describe('routing', () => {
    it("renders home page on '/'", () => {
      renderWithRouter(() => <App />, '/');
      expect(screen.getByRole('heading', { name: /Home/ })).toBeInTheDocument();
    });

    it("renders checkout page on '/cart'", () => {
      renderWithRouter(() => <App />, '/cart');
      expect(screen.getByRole('heading', { name: /Cart/ })).toBeInTheDocument();
    });

    it("renders home page on '/checkout'", () => {
      renderWithRouter(() => <App />, '/checkout');
      expect(
        screen.getByRole('heading', { name: /Checkout/ })
      ).toBeInTheDocument();
    });

    it("renders home page on '/order'", () => {
      renderWithRouter(() => <App />, '/order');
      expect(
        screen.getByRole('heading', { name: /Order summary/ })
      ).toBeInTheDocument();
    });

    it("renders 'page not found' message on nonexistent route", () => {
      renderWithRouter(() => <App />, '/this-route-does-not-exist');
      expect(screen.getByText('Page not found')).toBeInTheDocument();
    });
  });
});
