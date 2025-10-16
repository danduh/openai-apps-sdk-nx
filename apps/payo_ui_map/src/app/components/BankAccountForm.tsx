import { InputField } from './InputField';
import { Checkbox } from './Checkbox';

export interface BankAccountFormData {
  recipientEmail: string;
  amount: string;
  currency: string;
  confirmed: boolean;
}

export interface BankAccountFormProps {
  data: BankAccountFormData;
  onChange: (data: BankAccountFormData) => void;
}

export function BankAccountForm({ data, onChange }: BankAccountFormProps) {
  const updateField = <K extends keyof BankAccountFormData>(
    field: K,
    value: BankAccountFormData[K]
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px]">
      <h2 className="text-2xl font-bold text-[#252526] mb-2">Transfer Money</h2>
      
      <InputField
        label="Recipient Email"
        value={data.recipientEmail}
        onChange={(value) => updateField('recipientEmail', value)}
        placeholder="recipient@example.com"
        icon="✉️"
      />

      <InputField
        label="Amount"
        value={data.amount}
        onChange={(value) => updateField('amount', value)}
        placeholder="0.00"
        icon="💰"
      />

      <InputField
        label="Currency"
        value={data.currency}
        onChange={(value) => updateField('currency', value)}
        placeholder="USD"
      />

      <div className="flex gap-2.5 items-center">
        <Checkbox
          checked={data.confirmed}
          onChange={(value) => updateField('confirmed', value)}
        />
        <label className="text-sm font-medium text-[#252526] leading-[1.43]">
          I confirm the transfer details above
        </label>
      </div>
    </div>
  );
}
