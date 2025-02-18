import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto md:px-8 py-24">
      <h2 className="text-muted-foreground leading-loose mb-10 after:content-[''] after:size-2 after:bg-destructive after:rounded-full after:inline-block after:ml-2">
        Projects
      </h2>
      {children}
    </div>
  );
}
