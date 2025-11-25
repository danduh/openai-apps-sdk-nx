# Balance & Transaction UI

This React application displays user balances with a fullscreen transaction view.

## Features

### Compact Mode (Default)
- Displays balance cards in a vertical list
- Each card shows amount, currency, and icon (flag or cards emoji)
- Disabled balances show warning message
- Click any balance card to enter fullscreen mode

### Fullscreen Mode
- Shows balance summary at the top (horizontal scroll for multiple balances)
- Displays transaction list with tab navigation (Latest/Upcoming)
- Each transaction shows: date, recipient, type, amount, and navigation arrow
- Transactions can have badge status for special amounts

## Components

### `BalanceCard`
Balance display card with:
- Amount and currency
- Flag icon or cards emoji
- Disabled state support
- Click handler for mode switching

Props:
- `amount`: string
- `currency`: string
- `flagIcon?`: string (URL)
- `icon?`: 'flag' | 'cards'
- `disabled?`: boolean
- `disabledMessage?`: string
- `onClick?`: () => void | Promise<void>

### `BalanceSummary`
Horizontal scrollable balance cards for fullscreen view.

Props:
- `balances`: Balance[]

### `TransactionList`
Transaction table with tab navigation.

Props:
- `transactions`: Transaction[]
- `activeTab`: 'latest' | 'upcoming'
- `onTabChange`: (tab: 'latest' | 'upcoming') => void

## Types

```typescript
interface Balance {
  amount: string;
  currency: string;
  flagIcon?: string;
  icon?: 'flag' | 'cards';
  disabled?: boolean;
  disabledMessage?: string;
}

interface Transaction {
  id: string;
  date: string;
  recipient: string;
  type: string;
  amount: string;
  currency: string;
  status: string; // 'normal' | 'badge'
}
```

## Display Mode Integration

The app uses the OpenAI widget API to handle display mode changes:
- `window.openai.requestDisplayMode({ mode: 'fullscreen' })` - Request fullscreen
- Listens for `openai:displayModeChanged` events to respond to mode changes

## Testing

All components include Jest + React Testing Library tests:
- `BalanceCard.spec.tsx`
- `BalanceSummary.spec.tsx`
- `TransactionList.spec.tsx`
- `app.spec.tsx`

Run tests:
```bash
nx test payo_ui_balance
```

## Design

Implementation based on Figma design:
https://www.figma.com/design/3fpmNLUshirV6nrtjJrMl8/Early-exploration?node-id=1018-10226

## Tech Stack

- React 19 with TypeScript
- Tailwind CSS
- React Testing Library
- OpenAI Widget API (@payo/openai-tools)
