import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto md:px-8 py-24 space-y-14">
      <h2 className="dot-suffix">
        Projects
      </h2>
      {children}
    </div>
  );
}
