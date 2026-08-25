import Link from "next/link";
import { PlusIcon } from "./icons";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold"
    >
      <PlusIcon className="h-4 w-4" />
      새 링크
    </Link>
  );
}
