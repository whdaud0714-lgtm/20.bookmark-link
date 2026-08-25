"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/app/_lib/types";
import LinkInput from "./LinkInput";
import FolderSelect from "./FolderSelect";
import SaveButton from "./SaveButton";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(folders[0]?.id ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        새 링크 추가
      </h1>
      <LinkInput value={url} onChange={setUrl} />
      <FolderSelect folders={folders} value={folderId} onChange={setFolderId} />
      <SaveButton />
    </form>
  );
}
