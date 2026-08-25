import type { Folder } from "@/app/_lib/types";

type FolderSelectProps = {
  folders: Folder[];
  value: string;
  onChange: (value: string) => void;
};

export default function FolderSelect({
  folders,
  value,
  onChange,
}: FolderSelectProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-bold text-[var(--text)]">
      폴더
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-field rounded-xl bg-[var(--card-bg)] px-3.5 py-3 text-sm font-normal text-[var(--text)]"
      >
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}
