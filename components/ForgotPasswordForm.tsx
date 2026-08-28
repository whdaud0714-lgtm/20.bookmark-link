"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const canSubmit = email.trim() !== "" && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setToastMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setToastMessage("이메일 발송에 실패했습니다. 다시 시도해 주세요.");
        setIsSubmitting(false);
        return;
      }

      setIsSent(true);
    } catch {
      setToastMessage("이메일 발송에 실패했습니다. 다시 시도해 주세요.");
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <p className="rounded-xl bg-[var(--hover-bg)] px-4 py-3 text-[13px] font-bold text-[var(--accent)]">
        입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다. 메일함을 확인해
        주세요.
      </p>
    );
  }

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="이메일"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
        </button>
      </form>
    </>
  );
}
