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
      className={`folder-link flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${
        active ? "active" : ""
      }`}
    >
      <FolderIcon className="h-4 w-4" />
      <span className="truncate">{folder.name}</span>
    </Link>
  );
}
