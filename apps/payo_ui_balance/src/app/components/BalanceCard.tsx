// Import to ensure OpenAI global types are loaded
import '@payo/openai-tools';

interface BalanceCardProps {
  amount: string;
  currency: string;
  flagIcon?: string;
  icon?: 'flag' | 'cards';
  disabled?: boolean;
  disabledMessage?: string;
  onClick?: () => void | Promise<void>;
}

export function BalanceCard({
  amount,
  currency,
  flagIcon,
  icon = 'flag',
  disabled = false,
  disabledMessage,
  onClick,
}: BalanceCardProps) {
  // Adjust height based on disabled state
  const cardHeight = disabled ? 'h-[84px]' : 'h-16';
  
  const handleCardClick = async () => {
    if (disabled) return;
    
    if (onClick) {
      await onClick();
    }
  };
  
  return (
    <div 
      className={`relative w-full ${cardHeight} ${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={handleCardClick}
    >
      {/* Card container */}
      <div className={`absolute inset-0 bg-white rounded-lg shadow-[0px_1px_8px_0px_rgba(0,0,0,0.2)] transition-all duration-200 ${!disabled ? 'hover:shadow-[0px_2px_12px_0px_rgba(0,0,0,0.3)] hover:scale-[1.01]' : ''}`} />

      {/* Flag/Icon container */}
      <div className="absolute left-4 top-4 w-8 h-8">
        {icon === 'flag' && flagIcon ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={flagIcon} alt={currency} className="w-full h-full object-cover" />
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
          {amount} {currency}
        </p>
      </div>

      {/* Disabled state */}
      {disabled && disabledMessage && (
        <div className="absolute left-14 top-[52px] flex items-center gap-1">
          <span className="text-base text-[#e31b0c]" role="img" aria-label="warning">
            ⚠️
          </span>
          <p className="text-sm font-medium text-[#e31b0c] leading-[1.43] whitespace-nowrap">
            {disabledMessage}
          </p>
        </div>
      )}
    </div>
  );
}
