export interface Balance {
  amount: string;
  currency: string;
  flagIcon?: string;
  icon?: 'flag' | 'cards';
  disabled?: boolean;
  disabledMessage?: string;
}

export interface Transaction {
  id: string;
  date: string;
  recipient: string;
  type: string;
  amount: string;
  currency: string;
  status: string;
}

// Mock transaction data based on Figma design
export const mockTransactions: Transaction[] = [
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
  },
  {
    id: '3',
    date: '10 Mar 2018',
    recipient: 'Bank of America X-1234',
    type: 'Withdrawal',
    amount: '- 100.00',
    currency: 'USD',
    status: 'normal'
  },
  {
    id: '4',
    date: '11 Feb 2018',
    recipient: 'Adeline Parks',
    type: 'Pending',
    amount: '- 100.50',
    currency: 'GBP',
    status: 'badge'
  },
  {
    id: '5',
    date: '30 Sep 2018',
    recipient: 'Bank of America X-1234',
    type: 'Withdrawal',
    amount: '- 500.50',
    currency: 'USD',
    status: 'normal'
  },
  {
    id: '6',
    date: '30 May 2018',
    recipient: 'Angel Ramsey',
    type: 'Pending',
    amount: '958.77',
    currency: 'EUR',
    status: 'normal'
  },
  {
    id: '7',
    date: '12 Jan 2018',
    recipient: 'Bank of America X-1234',
    type: 'Withdrawal',
    amount: '- 599.53',
    currency: 'USD',
    status: 'normal'
  },
  {
    id: '8',
    date: '26 Apr 2018',
    recipient: 'Marie Roy',
    type: 'Completed',
    amount: '914.83',
    currency: 'EUR',
    status: 'normal'
  },
  {
    id: '9',
    date: '02 Feb 2018',
    recipient: 'Nellie Hampton',
    type: 'Pending',
    amount: '437.53',
    currency: 'EUR',
    status: 'normal'
  },
  {
    id: '10',
    date: '23 Nov 2018',
    recipient: 'Bertha Vega',
    type: 'Completed',
    amount: '569.57',
    currency: 'USD',
    status: 'normal'
  }
];
