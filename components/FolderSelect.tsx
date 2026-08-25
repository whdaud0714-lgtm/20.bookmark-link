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
    <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
      폴더
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-600"
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
