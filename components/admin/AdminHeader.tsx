import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import AdminLogoutButton from "./AdminLogoutButton";
import type { AdminUser } from "@/lib/api/admin";

export default function AdminHeader({ admin }: { admin: AdminUser }) {
  return (
    <header className="bg-navydeep text-white">
      <div className="mx-auto max-w-content px-6 h-16 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Image src="/icon.png" alt="" width={28} height={28} className="rounded-full" />
          <span className="flex items-center gap-1.5 font-display text-lg">
            Admin
            <ShieldCheck size={15} className="text-gold" strokeWidth={2} />
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60 hidden sm:inline">{admin.name ?? admin.email}</span>
          <AdminLogoutButton />
        </div>
      </div>
    </header>
  );
}
