import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-sm text-white dark:bg-zinc-50 dark:text-zinc-900">
        B
      </span>
      북마크 링크
    </Link>
  );
}
