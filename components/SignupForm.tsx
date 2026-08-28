"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

function toKoreanMessage(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return "이미 가입된 이메일입니다.";
  }
  if (normalized.includes("password") && normalized.includes("6")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (normalized.includes("valid email") || normalized.includes("invalid email")) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return "회원가입에 실패했습니다. 다시 시도해 주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const canSubmit =
    email.trim() !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    !isSubmitting;

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
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setToastMessage(toKoreanMessage(error.message));
        setIsSubmitting(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setToastMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
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
          label="이메일"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <AuthField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="비밀번호 확인"
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "회원가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}
