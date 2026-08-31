"use client";

import BookmarkGrid from "@/components/BookmarkGrid";
import { useBookmarks } from "@/app/_lib/BookmarkContext";

export default function HomeView() {
  const { bookmarks } = useBookmarks();
  return <BookmarkGrid bookmarks={bookmarks} />;
}
