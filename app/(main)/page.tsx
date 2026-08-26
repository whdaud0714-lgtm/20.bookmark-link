"use client";

import BookmarkGrid from "@/components/BookmarkGrid";
import { useBookmarks } from "@/app/_lib/BookmarkContext";

export default function Home() {
  const { bookmarks } = useBookmarks();
  return <BookmarkGrid bookmarks={bookmarks} />;
}
