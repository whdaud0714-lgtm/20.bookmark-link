import { buildMetadata } from "@/app/_lib/metadata";
import HomeView from "./HomeView";

export const metadata = buildMetadata({
  title: "홈",
  description: "저장한 모든 북마크를 한눈에 확인하세요.",
});

export default function Home() {
  return <HomeView />;
}
