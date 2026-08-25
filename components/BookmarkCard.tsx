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
      className="group flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          <GlobeIcon className="h-4 w-4" />
        </span>
        <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {getHostname(bookmark.url)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-sm font-semibold text-zinc-900 group-hover:underline dark:text-zinc-50">
          {bookmark.title}
        </h3>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
          {bookmark.description}
        </p>
      </div>
    </a>
  );
}
