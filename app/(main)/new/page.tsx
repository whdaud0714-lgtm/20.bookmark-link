import NewLinkForm from "@/components/NewLinkForm";
import { folders } from "@/app/_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
      <NewLinkForm folders={folders} />
    </div>
  );
}
