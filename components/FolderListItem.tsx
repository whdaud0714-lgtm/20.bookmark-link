import Link from "next/link";
import type { Folder } from "@/app/_lib/types";
import { FolderIcon } from "./icons";

type FolderListItemProps = {
  folder: Folder;
  active: boolean;
};

export default function FolderListItem({ folder, active }: FolderListItemProps) {
  return (
    <Link
      href={`/folder/${folder.id}`}
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      <FolderIcon className="h-4 w-4" />
      <span className="truncate">{folder.name}</span>
    </Link>
  );
}
