import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { folders } from "@/app/_lib/mock-data";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-black">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar folders={folders} />
        <main className="flex flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
