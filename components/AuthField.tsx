type AuthFieldProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  autoComplete?: string;
};

export default function AuthField({
  label,
  type,
  name,
  placeholder,
  autoComplete,
}: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-[var(--text)]">
      {label}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="input-field rounded-xl bg-[var(--card-bg)] px-3.5 py-3 text-sm font-normal text-[var(--text)] placeholder:text-[var(--placeholder)]"
      />
    </label>
  );
}
