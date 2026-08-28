"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import { useBookmarks } from "@/app/_lib/BookmarkContext";
import { FolderIcon, PencilIcon, TrashIcon } from "./icons";
import DeleteFolderModal from "./DeleteFolderModal";
import EditFolderModal from "./EditFolderModal";

type FolderListItemProps = {
  folder: Folder;
  active: boolean;
};

export default function FolderListItem({ folder, active }: FolderListItemProps) {
  const { deleteFolder, isDeletingFolder } = useFolders();
  const { bookmarks } = useBookmarks();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const bookmarkCount = bookmarks.filter(
    (bookmark) => bookmark.folderId === folder.id
  ).length;

  const handleEditClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowEditModal(true);
  };

  const handleDeleteClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteFolder(folder.id);
    setShowDeleteModal(false);
    if (active) {
      router.push("/");
    }
  };

  return (
    <div className="group relative">
      <Link
        href={`/folder/${folder.id}`}
        className={`folder-link flex w-full items-center gap-2 rounded-xl py-2 pr-16 pl-3 text-sm font-bold ${
          active ? "active" : ""
        }`}
      >
        <FolderIcon className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate">{folder.name}</span>
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 text-center text-xs font-bold ${
            active
              ? "bg-white/20 text-white"
              : "bg-[var(--hover-bg)] text-[var(--text-sub)]"
          }`}
        >
          {bookmarkCount}
        </span>
      </Link>
      <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-0.5">
        <button
          type="button"
          onClick={handleEditClick}
          aria-label={`${folder.name} 폴더 수정`}
          className={`flex h-6 w-6 items-center justify-center rounded-lg opacity-0 hover:bg-black/10 group-hover:opacity-100 ${
            active ? "text-white" : "text-[var(--text-sub)]"
          }`}
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          aria-label={`${folder.name} 폴더 삭제`}
          className={`flex h-6 w-6 items-center justify-center rounded-lg opacity-0 hover:bg-black/10 group-hover:opacity-100 ${
            active ? "text-white" : "text-[var(--text-sub)]"
          }`}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {showEditModal && (
        <EditFolderModal folder={folder} onClose={() => setShowEditModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteFolderModal
          folder={folder}
          isDeleting={isDeletingFolder}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
