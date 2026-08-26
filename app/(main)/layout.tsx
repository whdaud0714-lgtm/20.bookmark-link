import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderProvider from "@/app/_lib/FolderContext";
import BookmarkProvider from "@/app/_lib/BookmarkContext";
import { folders, bookmarks } from "@/app/_lib/mock-data";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FolderProvider initialFolders={folders}>
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
