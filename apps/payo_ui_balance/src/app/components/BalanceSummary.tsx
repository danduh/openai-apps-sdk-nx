interface Balance {
  amount: string;
  currency: string;
  flagIcon?: string;
  icon?: 'flag' | 'cards';
}

interface BalanceSummaryProps {
  balances: Balance[];
}

export function BalanceSummary({ balances }: BalanceSummaryProps) {
  return (
    <div className="w-full mb-6">
      {/* Title */}
      <h1 className="text-[20px] font-semibold text-[#252526] mb-4">
        Balances
      </h1>

      {/* Balance Cards - Horizontal Layout */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {balances.map((balance, index) => (
          <div 
            key={index}
            className="flex-shrink-0 w-[280px] h-16 relative"
          >
            {/* Card container */}
            <div className="absolute inset-0 bg-white rounded-lg shadow-[0px_1px_8px_0px_rgba(0,0,0,0.2)]" />

            {/* Flag/Icon container */}
            <div className="absolute left-4 top-4 w-8 h-8">
              {balance.icon === 'flag' && balance.flagIcon ? (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={balance.flagIcon} 
                    alt={balance.currency} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-2xl text-[#252526]" role="img" aria-label="cards">
                    💳
                  </span>
                </div>
              )}
            </div>

            {/* Amount and currency */}
            <div className="absolute left-14 top-8 -translate-y-1/2">
              <p className="text-2xl font-semibold text-[#252526] leading-[1.334] whitespace-nowrap">
                {balance.amount} {balance.currency}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
