import type { Bookmark } from "@/app/_lib/types";
import BookmarkCard from "./BookmarkCard";

type BookmarkGridProps = {
  bookmarks: Bookmark[];
};

export default function BookmarkGrid({ bookmarks }: BookmarkGridProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-[var(--text-sub)]">
        등록된 링크가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
