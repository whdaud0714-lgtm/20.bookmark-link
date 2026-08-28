import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderProvider from "@/app/_lib/FolderContext";
import BookmarkProvider from "@/app/_lib/BookmarkContext";
import { createClient } from "@/utils/supabase/server";
import type { Bookmark, Folder } from "@/app/_lib/types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient(await cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: folderData }, { data: linkData }] = await Promise.all([
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true }),
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .order("created_at", { ascending: false }),
  ]);

  const initialFolders: Folder[] = (folderData ?? []).map((folder) => ({
    id: String(folder.id),
    name: folder.name,
  }));

  const initialBookmarks: Bookmark[] = (linkData ?? []).map((link) => ({
    id: String(link.id),
    url: link.url,
    title: link.title ?? "",
    description: link.description ?? "",
    thumbnail: link.thumbnail_url,
    folderId: link.folder_id == null ? "" : String(link.folder_id),
  }));

  return (
    <FolderProvider initialFolders={initialFolders}>
      <BookmarkProvider initialBookmarks={initialBookmarks}>
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
