"use client";

import { useState, type MouseEvent } from "react";
import type { Bookmark } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/BookmarkContext";
import { GlobeIcon, PencilIcon, TrashIcon } from "./icons";
import DeleteBookmarkModal from "./DeleteBookmarkModal";
import EditBookmarkModal from "./EditBookmarkModal";

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { deleteBookmark, isDeletingBookmark } = useBookmarks();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    await deleteBookmark(bookmark.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="group relative">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4"
      >
        {bookmark.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.thumbnail}
            alt=""
            className="h-32 w-full rounded-xl object-cover"
          />
        )}
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--hover-bg)] text-[var(--accent)]">
            <GlobeIcon className="h-4 w-4" />
          </span>
          <span className="truncate text-xs text-[var(--text-sub)]">
            {getHostname(bookmark.url)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="truncate text-sm font-bold text-[var(--text)] group-hover:underline">
            {bookmark.title}
          </h3>
          <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
            {bookmark.description}
          </p>
        </div>
      </a>

      <div className="absolute top-3 right-3 flex items-center gap-1">
        <button
          type="button"
          onClick={handleEditClick}
          aria-label={`${bookmark.title} 링크 수정`}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--card-bg)] text-[var(--text-sub)] opacity-0 shadow-sm hover:bg-black/10 group-hover:opacity-100"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          aria-label={`${bookmark.title} 링크 삭제`}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--card-bg)] text-[var(--text-sub)] opacity-0 shadow-sm hover:bg-black/10 group-hover:opacity-100"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>

      {showEditModal && (
        <EditBookmarkModal
          bookmark={bookmark}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteBookmarkModal
          bookmark={bookmark}
          isDeleting={isDeletingBookmark}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
