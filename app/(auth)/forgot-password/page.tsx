import Link from "next/link";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="card-hover flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-7">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
          B
        </span>
        <h1 className="text-xl font-bold text-[var(--text)]">비밀번호 찾기</h1>
        <p className="text-center text-[13px] text-[var(--text-sub)]">
          가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다.
        </p>
      </div>

      <ForgotPasswordForm />

      <p className="text-center text-[13px] text-[var(--text-sub)]">
        <Link
          href="/login"
          className="font-bold text-[var(--accent)] hover:opacity-80"
        >
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
