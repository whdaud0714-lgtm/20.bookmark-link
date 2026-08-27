"use client";

import { useState, type FormEvent } from "react";
import { useFolders } from "@/app/_lib/FolderContext";

type NewFolderModalProps = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: NewFolderModalProps) {
  const { addFolder, isAddingFolder } = useFolders();
  const [name, setName] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || isAddingFolder) return;
    await addFolder(trimmed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="card-hover flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
      >
        <h2 className="text-lg font-bold text-[var(--text)]">새 폴더</h2>
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
            disabled={isAddingFolder}
            className="flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-bold text-[var(--accent)] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isAddingFolder}
            className="btn-primary flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold disabled:opacity-50"
          >
            {isAddingFolder ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
