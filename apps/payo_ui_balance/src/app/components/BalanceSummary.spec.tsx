import { render, screen } from '@testing-library/react';
import { BalanceSummary } from './BalanceSummary';

const mockBalances = [
  {
    amount: '25,500.00',
    currency: 'USD',
    icon: 'flag' as const,
    flagIcon: 'https://flagcdn.com/w40/us.png',
  },
  {
    amount: '5,500.00',
    currency: 'EUR',
    icon: 'cards' as const,
  }
];

describe('BalanceSummary', () => {
  it('renders balance summary title', () => {
    render(<BalanceSummary balances={mockBalances} />);
    
    expect(screen.getByText('Balances')).toBeTruthy();
  });

  it('renders all provided balances', () => {
    render(<BalanceSummary balances={mockBalances} />);
    
    expect(screen.getByText('25,500.00 USD')).toBeTruthy();
    expect(screen.getByText('5,500.00 EUR')).toBeTruthy();
  });

  it('renders flag icon when provided', () => {
    render(<BalanceSummary balances={mockBalances} />);
    
    const flagImage = screen.getByAltText('USD');
    expect(flagImage).toBeTruthy();
  });

  it('renders card emoji when icon is cards', () => {
    render(<BalanceSummary balances={mockBalances} />);
    
    const cardEmoji = screen.getByLabelText('cards');
    expect(cardEmoji).toBeTruthy();
  });

  it('renders empty list when no balances provided', () => {
    render(<BalanceSummary balances={[]} />);
    
    expect(screen.getByText('Balances')).toBeTruthy();
  });

  it('handles multiple balances', () => {
    const manyBalances = [
      { amount: '1,000', currency: 'USD', icon: 'cards' as const },
      { amount: '2,000', currency: 'EUR', icon: 'cards' as const },
      { amount: '3,000', currency: 'GBP', icon: 'cards' as const }
    ];
    
    render(<BalanceSummary balances={manyBalances} />);
    
    expect(screen.getByText('1,000 USD')).toBeTruthy();
    expect(screen.getByText('2,000 EUR')).toBeTruthy();
    expect(screen.getByText('3,000 GBP')).toBeTruthy();
  });
});
