
import { BalanceCard } from './components/BalanceCard';

export function App() {
  const balances = [
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
