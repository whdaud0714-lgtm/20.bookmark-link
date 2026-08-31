import { buildMetadata } from "@/app/_lib/metadata";
import NewLinkView from "./NewLinkView";

export const metadata = buildMetadata({
  title: "새 링크 추가",
  description: "새로운 북마크 링크를 추가해보세요.",
});

export default function NewLinkPage() {
  return <NewLinkView />;
}
