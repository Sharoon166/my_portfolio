import { HugeiconsIcon } from "@hugeicons/react";
import { CodeXml } from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer className="py-3 flex justify-between gap-5 flex-wrap-reverse">
      <div className="flex justify-between items-center text-sm">
        <div>
          <span className="text-xl align-middle">&copy;</span> {new Date().getFullYear()} -
          Made with{" "}
          <HugeiconsIcon icon={CodeXml} size={18} className="inline-block" />{" "}
          by Sharoon.
        </div>
      </div>
    </footer>
  );
}
