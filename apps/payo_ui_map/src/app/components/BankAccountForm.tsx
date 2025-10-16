import { InputField } from './InputField';
import { Checkbox } from './Checkbox';

export interface BankAccountFormData {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  swiftBic: string;
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
      <InputField
        label="Bank name"
        value={data.bankName}
        onChange={(value) => updateField('bankName', value)}
        placeholder="Bank of America"
      />

      <InputField
        label="Account holder name"
        value={data.accountHolder}
        onChange={(value) => updateField('accountHolder', value)}
        placeholder="Placeholder"
        icon="👤"
      />

      <InputField
        label="Account number"
        value={data.accountNumber}
        onChange={(value) => updateField('accountNumber', value)}
        placeholder="e.g. 214558"
        icon="ℹ️"
      />

      <InputField
        label="SWIFT/BIC"
        value={data.swiftBic}
        onChange={(value) => updateField('swiftBic', value)}
        placeholder="BOFAUS6NXXX"
        icon="ℹ️"
      />

      <div className="flex gap-2.5 items-center">
        <Checkbox
          checked={data.confirmed}
          onChange={(value) => updateField('confirmed', value)}
        />
        <label className="text-sm font-medium text-[#252526] leading-[1.43]">
          I confirm the bank account details above
        </label>
      </div>
    </div>
  );
}
