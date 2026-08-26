"use client";

import { useState } from "react";
import { PlusIcon } from "./icons";
import NewFolderModal from "./NewFolderModal";

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-xl bg-[var(--hover-bg)] px-4 py-2 text-sm font-bold text-[var(--accent)]"
      >
        <PlusIcon className="h-4 w-4" />
        새 폴더
      </button>
      {isOpen && <NewFolderModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
