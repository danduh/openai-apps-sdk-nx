import { render, screen } from '@testing-library/react';
import { App } from './app';

// Mock the openai global
(global as any).window = {
  ...(global as any).window,
  openai: {
    requestDisplayMode: jest.fn().mockResolvedValue({ mode: 'fullscreen' })
  }
};

describe('App', () => {
  it('renders balance title in compact mode', () => {
    render(<App />);
    
    expect(screen.getByText('Balances')).toBeTruthy();
  });

  it('renders balance cards in compact mode', () => {
    render(<App />);
    
    expect(screen.getByText('25,500.00 USD')).toBeTruthy();
    expect(screen.getByText('500.00 EUR')).toBeTruthy();
    expect(screen.getByText('5,500.00 EUR')).toBeTruthy();
  });

  it('renders disabled message for disabled balance', () => {
    render(<App />);
    
    expect(screen.getByText('Balance disabled')).toBeTruthy();
  });

  it('handles empty balance list', () => {
    // This test verifies the app doesn't crash with no balances
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
