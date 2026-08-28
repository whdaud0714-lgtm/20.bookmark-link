"use client";

import { useState, type FormEvent } from "react";
import type { Bookmark } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";
import { useBookmarks } from "@/app/_lib/BookmarkContext";
import FolderSelect from "./FolderSelect";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";

type EditBookmarkModalProps = {
  bookmark: Bookmark;
  onClose: () => void;
};

export default function EditBookmarkModal({
  bookmark,
  onClose,
}: EditBookmarkModalProps) {
  const { folders } = useFolders();
  const { updateBookmark, isUpdatingBookmark } = useBookmarks();
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);
  const [folderId, setFolderId] = useState(bookmark.folderId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle || isUpdatingBookmark) return;

    await updateBookmark(bookmark.id, {
      title: trimmedTitle,
      description: description.trim(),
      folderId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="card-hover flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
      >
        <h2 className="text-lg font-bold text-[var(--text)]">링크 수정</h2>
        <TitleInput value={title} onChange={setTitle} />
        <DescriptionInput value={description} onChange={setDescription} />
        <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdatingBookmark}
            className="flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-bold text-[var(--accent)] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isUpdatingBookmark}
            className="btn-primary flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-50"
          >
            {isUpdatingBookmark ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
