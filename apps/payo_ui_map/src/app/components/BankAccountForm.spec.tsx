import { render, screen, fireEvent } from '@testing-library/react';
import { BankAccountForm, BankAccountFormData } from './BankAccountForm';

describe('BankAccountForm', () => {
  const defaultData: BankAccountFormData = {
    bankName: 'Bank of America',
    accountHolder: '',
    accountNumber: '',
    swiftBic: 'BOFAUS6NXXX',
    confirmed: false,
  };

  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render all input fields', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    expect(screen.getByText('Bank name')).toBeTruthy();
    expect(screen.getByText('Account holder name')).toBeTruthy();
    expect(screen.getByText('Account number')).toBeTruthy();
    expect(screen.getByText('SWIFT/BIC')).toBeTruthy();
  });

  it('should render with provided bank name', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    const bankNameInput = screen.getByDisplayValue('Bank of America');
    expect(bankNameInput).toBeTruthy();
  });

  it('should render with provided SWIFT/BIC', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    const swiftInput = screen.getByDisplayValue('BOFAUS6NXXX');
    expect(swiftInput).toBeTruthy();
  });

  it('should call onChange when account holder name is typed', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('Account holder name');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultData,
      accountHolder: 'John Doe',
    });
  });

  it('should call onChange when account number is typed', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    const input = screen.getByLabelText('Account number');
    fireEvent.change(input, { target: { value: '214558' } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultData,
      accountNumber: '214558',
    });
  });

  it('should call onChange when confirmation checkbox is toggled', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultData,
      confirmed: true,
    });
  });

  it('should display confirmation text', () => {
    render(<BankAccountForm data={defaultData} onChange={mockOnChange} />);
    
    expect(
      screen.getByText('I confirm the bank account details above')
    ).toBeTruthy();
  });

  it('should display checked state when confirmed is true', () => {
    const confirmedData = { ...defaultData, confirmed: true };
    render(<BankAccountForm data={confirmedData} onChange={mockOnChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });
});
