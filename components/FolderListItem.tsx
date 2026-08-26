"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import { FolderIcon, TrashIcon } from "./icons";
import DeleteFolderModal from "./DeleteFolderModal";

type FolderListItemProps = {
  folder: Folder;
  active: boolean;
};

export default function FolderListItem({ folder, active }: FolderListItemProps) {
  const { deleteFolder } = useFolders();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteFolder(folder.id);
    setShowDeleteModal(false);
    if (active) {
      router.push("/");
    }
  };

  return (
    <div className="group relative">
      <Link
        href={`/folder/${folder.id}`}
        className={`folder-link flex w-full items-center gap-2 rounded-xl py-2 pr-9 pl-3 text-sm font-bold ${
          active ? "active" : ""
        }`}
      >
        <FolderIcon className="h-4 w-4 shrink-0" />
        <span className="truncate">{folder.name}</span>
      </Link>
      <button
        type="button"
        onClick={handleDeleteClick}
        aria-label={`${folder.name} 폴더 삭제`}
        className={`absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-lg opacity-0 hover:bg-black/10 group-hover:opacity-100 ${
          active ? "text-white" : "text-[var(--text-sub)]"
        }`}
      >
        <TrashIcon className="h-4 w-4" />
      </button>

      {showDeleteModal && (
        <DeleteFolderModal
          folder={folder}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
