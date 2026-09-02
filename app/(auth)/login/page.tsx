import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import { buildMetadata } from "@/app/_lib/metadata";

export const metadata = buildMetadata({
  title: "로그인",
  description: "북마크 링크에 로그인하고 나만의 링크를 관리해보세요.",
});

export default function LoginPage() {
  return (
    <div className="card-hover flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-7">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-white">
          B
        </span>
        <h1 className="text-xl font-bold text-[var(--text)]">북마크 링크</h1>
      </div>

      <LoginForm />

      <div className="flex flex-col items-center gap-2 text-[13px]">
        <p className="text-[var(--text-sub)]">
          비밀번호를 잊으셨나요?{" "}
          <Link
            href="/forgot-password"
            className="font-bold text-[var(--accent)] hover:opacity-80"
          >
            비밀번호 찾기
          </Link>
        </p>
        <p className="text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-bold text-[var(--accent)] hover:opacity-80"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
