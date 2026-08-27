import { cookies } from "next/headers";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderProvider from "@/app/_lib/FolderContext";
import BookmarkProvider from "@/app/_lib/BookmarkContext";
import { createClient } from "@/utils/supabase/server";
import { bookmarks } from "@/app/_lib/mock-data";
import type { Folder } from "@/app/_lib/types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("folders")
    .select("id, name")
    .order("created_at", { ascending: true });

  const initialFolders: Folder[] = (data ?? []).map((folder) => ({
    id: String(folder.id),
    name: folder.name,
  }));

  return (
    <FolderProvider initialFolders={initialFolders}>
      <BookmarkProvider initialBookmarks={bookmarks}>
        <div className="flex flex-1 flex-col bg-[var(--background)]">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex flex-1 overflow-hidden">{children}</main>
          </div>
        </div>
      </BookmarkProvider>
    </FolderProvider>
  );
}
