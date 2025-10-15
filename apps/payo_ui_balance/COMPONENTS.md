# Balance Page Components

This document describes the components generated for the Balance page based on the Figma designs.

## Components Created

### 1. BalanceCard Component
**Location:** `apps/payo_ui_balance/src/app/components/BalanceCard.tsx`

A reusable card component for displaying balance information.

#### Props:
- `amount: string` - The balance amount (e.g., "25,500.00")
- `currency: string` - The currency code (e.g., "USD", "EUR")
- `flagIcon?: string` - Optional URL to a flag icon image
- `icon?: 'flag' | 'cards'` - Type of icon to display (default: 'flag')
- `disabled?: boolean` - Whether the balance is disabled (default: false)
- `disabledMessage?: string` - Message to show when disabled (e.g., "Balance disabled")

#### Features:
- White card with rounded corners and shadow
- Flag or icon display on the left
- Large, bold amount and currency text
- Error state with warning icon and message for disabled balances
- Fully responsive design using Tailwind CSS

### 2. App Component (Main Page)
**Location:** `apps/payo_ui_balance/src/app/app.tsx`

The main Balance page that displays the list of balance cards.

#### Features:
- Page title "Balances" in large, bold text
- List of three balance cards:
  1. **USD Balance**: $25,500.00 with US flag
  2. **Disabled USD Balance**: $500.00 with UK flag and "Balance disabled" warning
  3. **EUR Balance**: €5,500.00 with cards icon
- Clean, modern layout with proper spacing
- Responsive container with max-width

## Design System

### Colors Used:
- **Primary Text**: `#252526` (Grey-700)
- **Error/Disabled**: `#E31B0C` (Red-500)
- **Background**: White cards on light gray background

### Typography:
- **Page Title**: 4xl font, bold
- **Balance Amount**: 2xl font, semibold (600 weight)
- **Disabled Message**: sm font, medium (500 weight)

### Spacing:
- Card height: 64px (h-16)
- Gap between cards: 16px (gap-4)
- Page padding: 24px (p-6)

## Usage Example

```tsx
<BalanceCard
  amount="25,500.00"
  currency="USD"
  icon="flag"
  flagIcon="https://flagcdn.com/w40/us.png"
/>

<BalanceCard
  amount="500.00"
  currency="USD"
  icon="flag"
  flagIcon="https://flagcdn.com/w40/gb.png"
  disabled={true}
  disabledMessage="Balance disabled"
/>

<BalanceCard
  amount="5,500.00"
  currency="EUR"
  icon="cards"
/>
```

## Notes:
- The component uses Tailwind CSS (already configured in the project)
- All accessibility requirements are met (proper ARIA labels for emojis)
- Flag icons are fetched from flagcdn.com (free flag icon service)
- The design closely matches the Figma specifications
