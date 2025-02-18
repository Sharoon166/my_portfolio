import { ContactSection } from "@/components/home/contact";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-32">
      {children}
      <ContactSection />
    </div>
  );
}
