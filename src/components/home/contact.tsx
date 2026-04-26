import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, GithubIcon, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { CopyButton } from "../copy-button";
import { profile } from "@/constants";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto py-12 px-10 md:py-20 space-y-10 border-2 border-zinc-800 bg-stone-900/40 rounded-[4rem] text-center"
    >
      <div className="text-lg sm:text-3xl md:text-5xl lg:text-6xl font-bricolage text-pretty">
        Got an idea? Let&apos;s turn it into something real
      </div>
      <div className="space-y-8">
        <div className="inline-flex items-center gap-4 sm:text-lg md:text-3xl text-destructive drop-shadow-[2px_2px_10px_currentcolor]">
          <a href={profile.emailLink}>{profile.email}</a>
          <CopyButton
            text={profile.email}
            className="align-middle md:text-3xl"
          />
        </div>
        <div className="w-max mx-auto flex md:flex-row flex-wrap gap-x-10 md:gap-x-20 gap-y-4 text-lg">
          <a
            href={profile.github}
            target="_blank"
            className="inline-flex items-center gap-3 hover:text-destructive transition-colors group"
          >
            <HugeiconsIcon icon={GithubIcon} size={20} className="md:text-destructive group-hover:scale-150 transition-transform" />
            <div className="max-md:sr-only">Github</div>
          </a>
          <a
            href={profile.linkenIn}
            target="_blank"
            className="inline-flex items-center gap-3 hover:text-destructive transition-colors group"
          >
            <HugeiconsIcon icon={Linkedin01Icon} size={20} className="md:text-destructive group-hover:scale-150 transition-transform" />
            <div className="max-md:sr-only">LinkedIn</div>
          </a>
        </div>
        <div>
          {" "}
          <a
            href={profile.meeting}
            target="_blank"
            className="inline-flex items-center gap-2 group relative overflow-hidden text-lg md:text-2xl text-destructive hover:underline underline-offset-4 p-3"
          >
            Let&apos;s Talk{" "}
            <HugeiconsIcon icon={ArrowRight02Icon} size={20} className="-rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-destructive ease-in" />
          </a>
        </div>
      </div>
    </section>
  );
}
