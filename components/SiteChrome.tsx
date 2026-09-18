"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

// The admin dashboard is an internal staff tool, not a marketing page — it
// gets its own header (components/admin/AdminHeader.tsx) and skips the
// public nav/breadcrumbs/footer/WhatsApp bubble entirely, rather than
// carrying the whole public site's chrome around every /admin page.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
