import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutForm } from './CheckoutForm';
import { act } from 'react-dom/test-utils';

describe('CheckoutForm', () => {
  afterAll(jest.clearAllMocks);
  it('renders correctly', () => {
    render(<CheckoutForm />);

    expect(screen.getByLabelText('Cardholders Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Card Number:')).toBeInTheDocument();
    expect(screen.getByLabelText('Expiration Date:')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV:')).toBeInTheDocument();
  });

  describe('with invalid inputs', () => {
    it('shows errors ', async () => {
      render(<CheckoutForm />);

      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /Place order/ }));
      });

      expect(screen.getAllByText(/Error/gi)).toHaveLength(4);
    });
  });

  describe('with valid inputs', () => {
    describe('on place order button click', () => {
      it('calls submit function with form data', async () => {
        const mockSubmit = jest.fn();

        render(<CheckoutForm submit={mockSubmit} />);

        await act(async () => {
          userEvent.type(
            screen.getByLabelText('Cardholders Name:'),
            'Bibo Bobbins'
          );
          userEvent.type(
            screen.getByLabelText('Card Number:'),
            '0000 0000 0000 0000'
          );
          userEvent.type(screen.getByLabelText('Expiration Date:'), '3020-05');
          userEvent.type(screen.getByLabelText('CVV:'), '123');
        });

        await act(async () => {
          userEvent.click(screen.getByRole('button', { name: /Place order/i }));
        });

        expect(mockSubmit).toHaveBeenCalled();
      });
    });
  });
});
