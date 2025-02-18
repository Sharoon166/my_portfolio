import { LuArrowRight, LuGithub, LuLinkedin, LuPhone } from "react-icons/lu";
import { CopyButton } from "../copy-button";
import { profile } from "@/constants";
export function ContactSection() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto py-12 px-10 md:py-20 space-y-10 border-2 border-zinc-800 bg-stone-900/40 rounded-[4rem] text-center"
    >
      <div className="text-sm md:text-lg">
        Looking for someone to turn your idea into reality?
      </div>
      <div className="space-y-8">
        <div className="inline-flex items-center gap-4 text-lg sm:text-3xl md:text-5xl lg:text-6xl text-destructive drop-shadow-[2px_2px_10px_currentcolor]">
          <a href={profile.emailLink}>{profile.email}</a>
          <CopyButton
            text={profile.email}
            className="align-middle md:text-3xl"
          />
        </div>
        <div className="w-max mx-auto flex flex-col md:flex-row flex-wrap gap-x-20 gap-y-4 text-lg">
          <a
            href={profile.whatsappLink}
            target="_blank"
            className="inline-flex items-center gap-3 hover:text-destructive transition-colors group"
          >
            <LuPhone className="text-destructive group-hover:scale-110 transition-transform" />
            {profile.whatsapp}
          </a>
          <a
            href={profile.github}
            target="_blank"
            className="inline-flex items-center gap-3 hover:text-destructive transition-colors group"
          >
            <LuGithub className="text-destructive group-hover:scale-110 transition-transform" />
            Github
          </a>
          <a
            href={profile.github}
            target="_blank"
            className="inline-flex items-center gap-3 hover:text-destructive transition-colors group"
          >
            <LuLinkedin className="text-destructive group-hover:scale-110 transition-transform" />
            LinkedIn
          </a>
        </div>
        <div>
          {" "}
          <a
            href={profile.meeting}
            target="_blank"
            className="inline-flex items-center gap-2 group relative overflow-hidden text-lg md:text-2xl text-destructive hover:underline underline-offset-4 p-3"
          >
            Schedule a Meeting{" "}
            <LuArrowRight className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-destructive" />
          </a>
        </div>
      </div>
    </section>
  );
}
