import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the bank account form', () => {
    render(<App />);
    expect(screen.getByText('Bank name')).toBeTruthy();
    expect(screen.getByText('Account holder name')).toBeTruthy();
    expect(screen.getByText('Account number')).toBeTruthy();
    expect(screen.getByText('SWIFT/BIC')).toBeTruthy();
  });
});
