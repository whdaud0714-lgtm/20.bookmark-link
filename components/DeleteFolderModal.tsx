"use client";

import type { Folder } from "@/app/_lib/types";

type DeleteFolderModalProps = {
  folder: Folder;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteFolderModal({
  folder,
  onConfirm,
  onClose,
}: DeleteFolderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="card-hover flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="text-lg font-bold text-[var(--text)]">폴더 삭제</h2>
        <p className="text-sm font-normal text-[var(--text-sub)]">
          {`'${folder.name}' 폴더를 삭제하시겠습니까?`}
          <br />이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-bold text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center justify-center rounded-xl bg-[var(--error)] px-4 py-2.5 text-sm font-bold text-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
