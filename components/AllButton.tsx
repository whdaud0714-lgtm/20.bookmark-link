import Link from "next/link";
import { LayersIcon } from "./icons";

type AllButtonProps = {
  active: boolean;
};

export default function AllButton({ active }: AllButtonProps) {
  return (
    <Link
      href="/"
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      <LayersIcon className="h-4 w-4" />
      전체
    </Link>
  );
}
