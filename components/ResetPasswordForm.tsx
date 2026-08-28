"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const canSubmit =
    password !== "" && passwordConfirm !== "" && !isSubmitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setToastMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setToastMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        const normalized = error.message.toLowerCase();
        if (normalized.includes("password") && normalized.includes("6")) {
          setToastMessage("비밀번호는 최소 6자 이상이어야 합니다.");
        } else if (normalized.includes("session")) {
          setToastMessage(
            "링크가 만료되었습니다. 비밀번호 재설정을 다시 요청해 주세요."
          );
        } else {
          setToastMessage("비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.");
        }
        setIsSubmitting(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setToastMessage("비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="새 비밀번호"
          type="password"
          name="password"
          placeholder="새 비밀번호를 입력하세요"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="새 비밀번호 확인"
          type="password"
          name="passwordConfirm"
          placeholder="새 비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
