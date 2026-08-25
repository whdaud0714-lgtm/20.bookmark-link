type LinkInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LinkInput({ value, onChange }: LinkInputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-[var(--text)]">
      링크
      <input
        type="url"
        required
        placeholder="https://example.com"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-field rounded-xl bg-[var(--card-bg)] px-3.5 py-3 text-sm font-normal text-[var(--text)] placeholder:text-[var(--placeholder)]"
      />
    </label>
  );
}
