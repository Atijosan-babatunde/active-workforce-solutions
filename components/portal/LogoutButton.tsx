"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/api/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-navy hover:bg-sand transition-colors"
    >
      <LogOut size={16} /> Log Out
    </button>
  );
}
