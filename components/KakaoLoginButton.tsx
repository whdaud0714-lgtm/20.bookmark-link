"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import kakaoLoginImage from "@/public/kakao_login_medium_wide.png";

export default function KakaoLoginButton() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleKakaoLogin = async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setIsRedirecting(false);
      }
    } catch {
      setIsRedirecting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      disabled={isRedirecting}
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Image
        src={kakaoLoginImage}
        alt="카카오 로그인"
        className="h-auto w-full"
        priority
      />
    </button>
  );
}
