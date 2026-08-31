import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata = buildMetadata({
  title: "회원가입",
  description: "북마크 링크에 가입하고 나만의 링크를 정리해보세요.",
});

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
      <Link
        href="/privacy"
        className="text-center text-[13px] text-[var(--text-sub)] hover:underline"
      >
        개인정보 처리방침
      </Link>
    </div>
  );
}
