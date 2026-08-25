import Link from "next/link";
import { PlusIcon } from "./icons";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <PlusIcon className="h-4 w-4" />
      새 링크
    </Link>
  );
}
