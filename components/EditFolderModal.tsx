"use client";

import { useState, type FormEvent } from "react";
import type { Folder } from "@/app/_lib/types";
import { useFolders } from "@/app/_lib/FolderContext";

type EditFolderModalProps = {
  folder: Folder;
  onClose: () => void;
};

export default function EditFolderModal({ folder, onClose }: EditFolderModalProps) {
  const { updateFolder, isUpdatingFolder } = useFolders();
  const [name, setName] = useState(folder.name);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || isUpdatingFolder) return;
    if (trimmed === folder.name) {
      onClose();
      return;
    }
    await updateFolder(folder.id, trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="card-hover flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
      >
        <h2 className="text-lg font-bold text-[var(--text)]">폴더 이름 수정</h2>
        <label className="flex flex-col gap-1.5 text-sm font-bold text-[var(--text)]">
          폴더 이름
          <input
            type="text"
            required
            autoFocus
            placeholder="폴더 이름을 입력하세요"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-field rounded-xl bg-[var(--card-bg)] px-3.5 py-3 text-sm font-normal text-[var(--text)] placeholder:text-[var(--placeholder)]"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdatingFolder}
            className="flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-bold text-[var(--accent)] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isUpdatingFolder}
            className="btn-primary flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-50"
          >
            {isUpdatingFolder ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
