"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/app/_lib/types";
import { useBookmarks } from "@/app/_lib/BookmarkContext";
import LinkInput from "./LinkInput";
import FolderSelect from "./FolderSelect";
import SaveButton from "./SaveButton";

type NewLinkFormProps = {
  folders: Folder[];
};

type LinkPreview = {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const { addBookmark } = useBookmarks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSaving) return;

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(
        `/api/link-preview?url=${encodeURIComponent(url)}`
      );

      if (!response.ok) {
        throw new Error("링크 정보를 가져오지 못했습니다.");
      }

      const preview: LinkPreview = await response.json();

      await addBookmark({
        url: preview.url,
        title: preview.title,
        description: preview.description,
        thumbnail: preview.thumbnail,
        folderId,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 다시 시도해 주세요.");
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-hover flex w-full max-w-md flex-col gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
    >
      <h1 className="text-lg font-bold text-[var(--text)]">새 링크 추가</h1>
      <LinkInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      {error && <p className="text-xs font-bold text-[var(--error)]">{error}</p>}
      <SaveButton loading={isSaving} />
    </form>
  );
}
