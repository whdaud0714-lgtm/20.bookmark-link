"use client";

import NewLinkForm from "@/components/NewLinkForm";
import { useFolders } from "@/app/_lib/FolderContext";

export default function NewLinkView() {
  const { folders } = useFolders();

  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
      <NewLinkForm folders={folders} />
    </div>
  );
}
