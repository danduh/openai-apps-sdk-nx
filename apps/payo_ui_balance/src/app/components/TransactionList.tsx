interface Transaction {
  id: string;
  date: string;
  recipient: string;
  type: string;
  amount: string;
  currency: string;
  status: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  activeTab: 'latest' | 'upcoming';
  onTabChange: (tab: 'latest' | 'upcoming') => void;
}

export function TransactionList({ 
  transactions, 
  activeTab, 
  onTabChange 
}: TransactionListProps) {
  return (
    <div className="flex flex-col gap-[7px]">
      {/* Header */}
      <div className="flex flex-col">
        <h2 className="text-[20px] font-semibold text-[#252526] leading-normal">
          Transactions
        </h2>
        <p className="text-[14px] font-medium text-[#666666] leading-normal mt-[8px]">
          Updated every several minutes
        </p>
      </div>

      {/* Tabs and Table Container */}
      <div className="relative">
        {/* Background white card */}
        <div className="absolute inset-0 bg-white rounded-[2px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]" />

        {/* Tab Navigation */}
        <div className="relative flex items-center h-[63px] px-4 border-b-[5px] border-[#dcdcdc]">
          {/* Active tab indicator */}
          <div 
            className={`absolute bottom-[-5px] h-[5px] bg-[#0075e1] transition-all duration-200 ${
              activeTab === 'latest' ? 'left-0 w-[195px]' : 'left-[195px] w-[195px]'
            }`}
          />
          
          <button
            onClick={() => onTabChange('latest')}
            className={`text-[16px] font-semibold px-6 py-2 transition-colors ${
              activeTab === 'latest' 
                ? 'text-[#252526]' 
                : 'text-[#252526] opacity-60'
            }`}
          >
            Latest
          </button>
          
          <button
            onClick={() => onTabChange('upcoming')}
            className={`text-[16px] font-medium px-6 py-2 transition-colors ${
              activeTab === 'upcoming' 
                ? 'text-[#252526]' 
                : 'text-[#252526] opacity-60'
            }`}
          >
            Upcoming
          </button>

          <button className="ml-auto text-[16px] font-medium text-[#0075e1]">
            View all &gt;
          </button>
        </div>

        {/* Transaction Table */}
        <div className="relative bg-white rounded-b-[2px]">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="relative flex items-center h-[52px] px-4 border-b border-[#dcdcdc] last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Date */}
              <div className="w-[140px] flex-shrink-0">
                <p className={`text-[16px] ${
                  activeTab === 'latest' ? 'font-medium' : 'font-normal'
                } text-[#252526]`}>
                  {transaction.date}
                </p>
              </div>

              {/* Recipient */}
              <div className="flex-1 ml-4">
                <p className="text-[16px] font-semibold text-[#252526]">
                  {transaction.recipient}
                </p>
              </div>

              {/* Transaction Type/Status */}
              <div className="w-[140px] flex-shrink-0 ml-4">
                <p className={`text-[16px] ${
                  activeTab === 'latest' ? 'font-medium' : 'font-normal'
                } text-[#252526]`}>
                  {transaction.type}
                </p>
              </div>

              {/* Amount */}
              <div className="w-[200px] flex-shrink-0 ml-4 flex items-center justify-end gap-2">
                {/* Show badge for some amounts */}
                {transaction.status === 'badge' && (
                  <div className="bg-[#dcdcdc] px-2 py-1 rounded-[2px]">
                    <p className="text-[16px] font-semibold text-[#252526] whitespace-nowrap">
                      {transaction.amount} {transaction.currency}
                    </p>
                  </div>
                )}
                {transaction.status !== 'badge' && (
                  <p className="text-[16px] font-semibold text-[#252526] whitespace-nowrap">
                    {transaction.amount} {transaction.currency}
                  </p>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="w-[35px] flex-shrink-0 ml-4 flex justify-end">
                <svg 
                  width="19" 
                  height="19" 
                  viewBox="0 0 19 19" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#252526]"
                >
                  <path 
                    d="M7 5L12 9.5L7 14" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
