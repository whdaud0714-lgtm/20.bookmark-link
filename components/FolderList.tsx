import type { Folder } from "@/app/_lib/types";
import FolderListItem from "./FolderListItem";

type FolderListProps = {
  folders: Folder[];
  activeFolderId: string | null;
};

export default function FolderList({ folders, activeFolderId }: FolderListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li key={folder.id}>
          <FolderListItem folder={folder} active={activeFolderId === folder.id} />
        </li>
      ))}
    </ul>
  );
}
