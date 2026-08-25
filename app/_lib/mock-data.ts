import type { Bookmark, Folder } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "news", name: "뉴스" },
  { id: "reading", name: "읽을거리" },
];

export const bookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Next.js 공식 문서, App Router와 최신 기능을 확인할 수 있습니다.",
    folderId: "dev",
  },
  {
    id: "2",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크 공식 사이트.",
    folderId: "dev",
  },
  {
    id: "3",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준과 API에 대한 신뢰할 수 있는 레퍼런스.",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "전 세계 디자이너들의 작업물을 구경할 수 있는 커뮤니티.",
    folderId: "design",
  },
  {
    id: "5",
    title: "Figma",
    url: "https://figma.com",
    description: "협업 기반의 인터페이스 디자인 툴.",
    folderId: "design",
  },
  {
    id: "6",
    title: "Hacker News",
    url: "https://news.ycombinator.com",
    description: "개발자와 스타트업 관련 최신 소식을 모아보는 커뮤니티.",
    folderId: "news",
  },
  {
    id: "7",
    title: "TechCrunch",
    url: "https://techcrunch.com",
    description: "테크 업계 소식을 다루는 뉴스 매체.",
    folderId: "news",
  },
  {
    id: "8",
    title: "Overreacted",
    url: "https://overreacted.io",
    description: "Dan Abramov의 개인 블로그, 프론트엔드 인사이트.",
    folderId: "reading",
  },
];
