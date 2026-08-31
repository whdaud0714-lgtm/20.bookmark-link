import { buildMetadata } from "@/app/_lib/metadata";
import FolderView from "./FolderView";

export const metadata = buildMetadata({
  title: "폴더",
  description: "폴더별로 정리된 북마크를 확인하세요.",
});

export default function FolderPage() {
  return <FolderView />;
}
