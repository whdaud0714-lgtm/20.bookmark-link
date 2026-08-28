"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LogOutIcon } from "./icons";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="logout-btn mt-auto flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-bold disabled:opacity-60"
    >
      <LogOutIcon className="h-4 w-4" />
      {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
