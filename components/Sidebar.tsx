"use client";

import { usePathname } from "next/navigation";
import type { Folder } from "@/app/_lib/types";
import AllButton from "./AllButton";
import FolderList from "./FolderList";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  const pathname = usePathname();
  const activeFolderId = pathname?.startsWith("/folder/")
    ? (pathname.split("/")[2] ?? null)
    : null;

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-4 border-r border-zinc-200 p-4 dark:border-zinc-800">
      <AllButton active={pathname === "/"} />
      <div className="flex flex-col gap-1">
        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          폴더
        </p>
        <FolderList folders={folders} activeFolderId={activeFolderId} />
      </div>
    </aside>
  );
}
