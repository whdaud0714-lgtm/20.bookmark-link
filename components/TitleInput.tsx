type TitleInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-[var(--text)]">
      제목
      <input
        type="text"
        required
        autoFocus
        placeholder="제목을 입력하세요"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-field rounded-xl bg-[var(--card-bg)] px-3.5 py-3 text-sm font-normal text-[var(--text)] placeholder:text-[var(--placeholder)]"
      />
    </label>
  );
}
