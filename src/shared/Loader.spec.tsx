import React from 'react';
import { Loader } from './Loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
  it('renders correctly', () => {
    render(<Loader />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
