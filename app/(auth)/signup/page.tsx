import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="card-hover flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-7">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
          B
        </span>
        <h1 className="text-xl font-bold text-[var(--text)]">북마크 링크</h1>
      </div>

      <SignupForm />

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
