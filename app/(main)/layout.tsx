import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FolderProvider from "@/app/_lib/FolderContext";
import { folders } from "@/app/_lib/mock-data";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FolderProvider initialFolders={folders}>
      <div className="flex flex-1 flex-col bg-[var(--background)]">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </FolderProvider>
  );
}
