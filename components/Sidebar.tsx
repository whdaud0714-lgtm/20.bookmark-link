"use client";

import { usePathname } from "next/navigation";
import { useFolders } from "@/app/_lib/FolderContext";
import AllButton from "./AllButton";
import FolderList from "./FolderList";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const { folders } = useFolders();
  const pathname = usePathname();
  const activeFolderId = pathname?.startsWith("/folder/")
    ? (pathname.split("/")[2] ?? null)
    : null;

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-4 bg-[var(--card-bg)] p-4">
      <AllButton active={pathname === "/"} />
      <div className="flex flex-col gap-1">
        <p className="px-3 text-xs font-bold tracking-wide text-[var(--text-sub)] uppercase">
          폴더
        </p>
        <FolderList folders={folders} activeFolderId={activeFolderId} />
      </div>
      <LogoutButton />
    </aside>
  );
}
