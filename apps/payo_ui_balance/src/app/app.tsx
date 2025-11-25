import { useState, useEffect } from 'react';
import { BalanceCard } from './components/BalanceCard';
import { BalanceSummary } from './components/BalanceSummary';
import { TransactionList } from './components/TransactionList';
import { Balance, mockTransactions } from './types';
import '@payo/openai-tools';

export function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'latest' | 'upcoming'>('latest');

  const balances: Balance[] = [
    {
      amount: '25,500.00',
      currency: 'USD',
      icon: 'flag' as const,
      flagIcon: 'https://flagcdn.com/w40/us.png',
    },
    {
      amount: '500.00',
      currency: 'EUR',
      icon: 'flag' as const,
      flagIcon: 'https://flagcdn.com/w40/eu.png',
      disabled: true,
      disabledMessage: 'Balance disabled',
    },
    {
      amount: '5,500.00',
      currency: 'EUR',
      icon: 'cards' as const,
    },
  ];

  // Listen for display mode changes from OpenAI
  useEffect(() => {
    const handleDisplayModeChange = (event: CustomEvent) => {
      const mode = event.detail?.mode;
      setIsFullscreen(mode === 'fullscreen');
    };

    // Listen for display mode changes
    window.addEventListener('openai:displayModeChanged', handleDisplayModeChange as EventListener);

    return () => {
      window.removeEventListener('openai:displayModeChanged', handleDisplayModeChange as EventListener);
    };
  }, []);

  // Handler for BalanceCard click
  const handleBalanceClick = async () => {
    try {
      await window.openai.requestDisplayMode({ mode: 'fullscreen' });
      setIsFullscreen(true);
    } catch (error) {
      console.error('Failed to request fullscreen:', error);
    }
  };

  // Compact view - Original balance cards list
  if (!isFullscreen) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-[#252526] mb-8">Balances</h1>

          {/* Balance Cards List */}
          <div className="flex flex-col gap-4">
            {balances.map((balance, index) => (
              <BalanceCard
                key={index}
                amount={balance.amount}
                currency={balance.currency}
                flagIcon={balance.flagIcon}
                icon={balance.icon}
                disabled={balance.disabled}
                disabledMessage={balance.disabledMessage}
                onClick={handleBalanceClick}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fullscreen view - Balance summary + transactions
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1626px] mx-auto">
        {/* Balance Summary */}
        <BalanceSummary balances={balances.filter(b => !b.disabled)} />

        {/* Transaction List */}
        <TransactionList
          transactions={mockTransactions}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}

export default App;
