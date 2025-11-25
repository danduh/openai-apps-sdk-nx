import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionList } from './TransactionList';

const mockTransactions = [
  {
    id: '1',
    date: '28 Aug 2018',
    recipient: 'Facebook Ads',
    type: 'Approved',
    amount: '300.00',
    currency: 'USD',
    status: 'normal'
  },
  {
    id: '2',
    date: '10 Jun 2018',
    recipient: 'Japanpost',
    type: 'Completed',
    amount: '- 250.50',
    currency: 'GBP',
    status: 'badge'
  }
];

describe('TransactionList', () => {
  it('renders transaction header', () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('Transactions')).toBeTruthy();
    expect(screen.getByText('Updated every several minutes')).toBeTruthy();
  });

  it('renders tab navigation', () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('Latest')).toBeTruthy();
    expect(screen.getByText('Upcoming')).toBeTruthy();
    expect(screen.getByText(/View all/)).toBeTruthy();
  });

  it('calls onTabChange when clicking tab', () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    const upcomingButton = screen.getByText('Upcoming');
    fireEvent.click(upcomingButton);
    
    expect(mockOnTabChange).toHaveBeenCalledWith('upcoming');
  });

  it('renders transaction list items', () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('Facebook Ads')).toBeTruthy();
    expect(screen.getByText('Japanpost')).toBeTruthy();
    expect(screen.getByText('28 Aug 2018')).toBeTruthy();
    expect(screen.getByText('10 Jun 2018')).toBeTruthy();
  });

  it('renders transaction amounts correctly', () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('300.00 USD')).toBeTruthy();
    expect(screen.getByText('- 250.50 GBP')).toBeTruthy();
  });

  it('renders empty list when no transactions provided', () => {
    const mockOnTabChange = jest.fn();
    render(
      <TransactionList 
        transactions={[]} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('Transactions')).toBeTruthy();
  });

  it('switches between latest and upcoming tabs', () => {
    const mockOnTabChange = jest.fn();
    const { rerender } = render(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="latest"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('Latest')).toBeTruthy();
    
    rerender(
      <TransactionList 
        transactions={mockTransactions} 
        activeTab="upcoming"
        onTabChange={mockOnTabChange}
      />
    );
    
    expect(screen.getByText('Upcoming')).toBeTruthy();
  });
});
