import type { Bookmark } from "@/app/_lib/types";
import { GlobeIcon } from "./icons";

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-4"
    >
      {bookmark.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bookmark.thumbnail}
          alt=""
          className="h-32 w-full rounded-xl object-cover"
        />
      )}
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--hover-bg)] text-[var(--accent)]">
          <GlobeIcon className="h-4 w-4" />
        </span>
        <span className="truncate text-xs text-[var(--text-sub)]">
          {getHostname(bookmark.url)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-sm font-bold text-[var(--text)] group-hover:underline">
          {bookmark.title}
        </h3>
        <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
          {bookmark.description}
        </p>
      </div>
    </a>
  );
}
