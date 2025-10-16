import '../styles.css';
import { useState } from 'react';
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
  
  
  console.log(
    'test_text from widget props:',
    test_text ? test_text : 'no props found'
  );

  const [formData, setFormData] = useState<BankAccountFormData>({
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    swiftBic: '',
    confirmed: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <BankAccountForm data={formData} onChange={setFormData} />
      </div>
    </div>
  );
}

export default App;
