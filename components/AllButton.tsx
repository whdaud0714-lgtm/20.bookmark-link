import Link from "next/link";
import { LayersIcon } from "./icons";

type AllButtonProps = {
  active: boolean;
};

export default function AllButton({ active }: AllButtonProps) {
  return (
    <Link
      href="/"
      className={`folder-link flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${
        active ? "active" : ""
      }`}
    >
      <LayersIcon className="h-4 w-4" />
      전체
    </Link>
  );
}
