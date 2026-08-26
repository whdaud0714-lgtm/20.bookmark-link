type SaveButtonProps = {
  loading?: boolean;
};

export default function SaveButton({ loading = false }: SaveButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="btn-primary mt-2 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold disabled:opacity-60"
    >
      {loading ? "저장 중..." : "저장"}
    </button>
  );
}
