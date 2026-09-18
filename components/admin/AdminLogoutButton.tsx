"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { adminLogout } from "@/lib/api/admin";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await adminLogout();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
    >
      <LogOut size={14} /> Log Out
    </button>
  );
}
