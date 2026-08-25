import BookmarkGrid from "@/components/BookmarkGrid";
import { bookmarks } from "@/app/_lib/mock-data";

export default async function FolderPage(props: PageProps<"/folder/[folderId]">) {
  const { folderId } = await props.params;
  const folderBookmarks = bookmarks.filter(
    (bookmark) => bookmark.folderId === folderId
  );

  return <BookmarkGrid bookmarks={folderBookmarks} />;
}
