import '../styles.css';
import { useEffect, useState } from 'react';
import {
  BankAccountForm,
  BankAccountFormData,
} from './components/BankAccountForm';

import { useOpenAiGlobal } from '@payo/openai-tools';

export function useWidgetProps<T extends Record<string, unknown>>(
  defaultState?: T | (() => T)
): T {
  const props = useOpenAiGlobal('toolOutput') as T;

  const fallback =
    typeof defaultState === 'function'
      ? (defaultState as () => T | null)()
      : defaultState ?? null;

  return props ?? fallback;
}

export function App() {
  const { test_text } = useWidgetProps({ test_text: 'default text' });
  console.log('Received test_text prop:', test_text);
  const toolOutput = useOpenAiGlobal('toolOutput');
  console.log('Received toolOutput prop:', toolOutput);
  
  const [formData, setFormData] = useState<BankAccountFormData>({
    recipientEmail: '',
    amount: '',
    currency: 'USD',
    confirmed: false,
  });

  const toolOutputData = window?.openai?.toolOutput?.data as
    | BankAccountFormData
    | undefined;

  console.log('Tool output data:', toolOutputData);

  useEffect(() => {
    if (toolOutputData) {
      setFormData({
        recipientEmail: toolOutputData.recipientEmail || '',
        amount: toolOutputData.amount || '',
        currency: toolOutputData.currency || 'USD',
        confirmed: toolOutputData.confirmed || false,
      });
    }
  }, [toolOutputData]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <BankAccountForm data={formData} onChange={setFormData} />
      </div>
    </div>
  );
}

export default App;
