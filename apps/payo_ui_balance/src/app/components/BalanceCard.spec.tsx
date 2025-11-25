import { render, screen } from '@testing-library/react';
import { BalanceCard } from './BalanceCard';

describe('BalanceCard', () => {
  it('renders balance amount and currency', () => {
    render(
      <BalanceCard 
        amount="25,500.00" 
        currency="USD" 
        icon="cards"
      />
    );
    
    expect(screen.getByText('25,500.00 USD')).toBeTruthy();
  });

  it('renders flag icon when provided', () => {
    render(
      <BalanceCard 
        amount="500.00" 
        currency="EUR" 
        icon="flag"
        flagIcon="https://flagcdn.com/w40/eu.png"
      />
    );
    
    const flagImage = screen.getByAltText('EUR');
    expect(flagImage).toBeTruthy();
  });

  it('renders card emoji when icon is cards', () => {
    render(
      <BalanceCard 
        amount="5,500.00" 
        currency="EUR" 
        icon="cards"
      />
    );
    
    const cardEmoji = screen.getByLabelText('cards');
    expect(cardEmoji).toBeTruthy();
  });

  it('renders disabled state with message', () => {
    render(
      <BalanceCard 
        amount="500.00" 
        currency="EUR" 
        icon="cards"
        disabled={true}
        disabledMessage="Balance disabled"
      />
    );
    
    expect(screen.getByText('Balance disabled')).toBeTruthy();
  });

  it('renders with onClick handler', () => {
    const mockOnClick = jest.fn();
    render(
      <BalanceCard 
        amount="25,500.00" 
        currency="USD" 
        icon="cards"
        onClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('25,500.00 USD')).toBeTruthy();
  });

  it('renders disabled card without crashing', () => {
    const mockOnClick = jest.fn();
    render(
      <BalanceCard 
        amount="500.00" 
        currency="EUR" 
        icon="cards"
        disabled={true}
        onClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('500.00 EUR')).toBeTruthy();
  });

  it('renders with all props provided', () => {
    render(
      <BalanceCard 
        amount="500.00" 
        currency="EUR" 
        icon="flag"
        flagIcon="https://flagcdn.com/w40/eu.png"
        disabled={true}
        disabledMessage="Balance disabled"
      />
    );
    
    expect(screen.getByText('500.00 EUR')).toBeTruthy();
    expect(screen.getByText('Balance disabled')).toBeTruthy();
  });
});
