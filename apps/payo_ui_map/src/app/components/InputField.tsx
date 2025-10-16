interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: string;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon
}: InputFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="relative w-full h-[60px] bg-white rounded-md">
      {/* Input Container */}
      <div className="absolute inset-0 flex flex-col items-start px-4 border border-[#252526] rounded-md bg-white">
        <div className="flex gap-3 items-center w-full min-h-[60px]">
          <input
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={label}
            className="flex-1 text-base font-medium text-[#252526] leading-[22px] bg-transparent outline-none placeholder:text-[#666666]"
          />
          {icon && (
            <div className="shrink-0 w-6 h-6 flex items-center justify-center text-[#252526] text-xl">
              {icon}
            </div>
          )}
        </div>
      </div>

      {/* Floating Label */}
      <div className="absolute left-[10px] top-0 bg-white px-1 flex items-center h-px">
        <label htmlFor={id} className="text-sm font-medium text-[#666666] leading-5">
          {label}
        </label>
      </div>
    </div>
  );
}
