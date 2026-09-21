import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { aboutSchema } from "@/data/json-ld";

export const metadata: Metadata = {
  title: "About",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <div className="space-y-32">{children}</div>
    </>
  );
}
