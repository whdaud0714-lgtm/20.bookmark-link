"use client";

import type { Bookmark } from "@/app/_lib/types";

type DeleteBookmarkModalProps = {
  bookmark: Bookmark;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteBookmarkModal({
  bookmark,
  isDeleting,
  onConfirm,
  onClose,
}: DeleteBookmarkModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="card-hover flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <h2 className="text-lg font-bold text-[var(--text)]">링크 삭제</h2>
        <p className="text-sm font-normal text-[var(--text-sub)]">
          {`'${bookmark.title}' 링크를 삭제하시겠습니까?`}
          <br />이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex items-center justify-center rounded-xl bg-[var(--hover-bg)] px-4 py-2.5 text-sm font-bold text-[var(--accent)] disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center justify-center rounded-xl bg-[var(--error)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-50"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}
