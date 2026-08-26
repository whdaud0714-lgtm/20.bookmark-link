"use client";

import { useParams } from "next/navigation";
import BookmarkGrid from "@/components/BookmarkGrid";
import { useBookmarks } from "@/app/_lib/BookmarkContext";

export default function FolderPage() {
  const params = useParams<{ folderId: string }>();
  const { bookmarks } = useBookmarks();
  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === params.folderId
  );

  return <BookmarkGrid bookmarks={folderBookmarks} />;
}
