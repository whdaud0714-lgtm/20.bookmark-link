type DescriptionInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionInput({
  value,
  onChange,
}: DescriptionInputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-[var(--text)]">
      설명
      <textarea
        rows={3}
        placeholder="설명을 입력하세요"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-field resize-none rounded-xl bg-[var(--card-bg)] px-3.5 py-3 text-sm font-normal text-[var(--text)] placeholder:text-[var(--placeholder)]"
      />
    </label>
  );
}
