import Link from "next/link";
import AuthField from "@/components/AuthField";

export default function SignupPage() {
  return (
    <div className="card-hover flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-7">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
          B
        </span>
        <h1 className="text-xl font-bold text-[var(--text)]">북마크 링크</h1>
      </div>

      <form className="flex flex-col gap-4">
        <AuthField
          label="이메일"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
        />
        <AuthField
          label="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="btn-primary mt-2 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold"
        >
          회원가입
        </button>
      </form>

      <p className="text-center text-[13px] text-[var(--text-sub)]">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-bold text-[var(--accent)] hover:opacity-80"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
