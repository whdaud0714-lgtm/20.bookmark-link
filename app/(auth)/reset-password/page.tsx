import ResetPasswordForm from "@/components/ResetPasswordForm";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata = buildMetadata({
  title: "비밀번호 재설정",
  description: "새로 사용할 비밀번호를 입력해 주세요.",
});

export default function ResetPasswordPage() {
  return (
    <div className="card-hover flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-7">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
          B
        </span>
        <h1 className="text-xl font-bold text-[var(--text)]">비밀번호 재설정</h1>
        <p className="text-center text-[13px] text-[var(--text-sub)]">
          새로 사용할 비밀번호를 입력해 주세요.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
