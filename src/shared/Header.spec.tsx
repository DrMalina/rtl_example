import React from 'react';
import { Header } from './Header';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('./CartWidget', () => ({
  CartWidget: () => <h2>Cart widget</h2>,
}));

describe('Header', () => {
  it('renders correctly', () => {
    renderWithRouter(() => <Header />);
    expect(
      screen.getByRole('link', { name: /Goblin Store/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Cart widget')).toBeInTheDocument();
  });

  it("navigates to '/' on header title click", () => {
    const { history } = renderWithRouter(() => <Header />);
    userEvent.click(screen.getByRole('link', { name: /Goblin Store/ }));

    expect(history.location.pathname).toEqual('/');
  });
});
