type LinkInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LinkInput({ value, onChange }: LinkInputProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      링크
      <input
        type="url"
        required
        placeholder="https://example.com"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-600"
      />
    </label>
  );
}
