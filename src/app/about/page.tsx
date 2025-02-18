import Image from "next/image";
import {
  LuArrowRight,
  LuGithub,
  LuInstagram,
  LuLinkedin,
} from "react-icons/lu";
import TooltipComponent from "@/components/tooltip";
import {
  profile,
  technologies,
  technologiesCollection,
  tools,
} from "@/constants";

export default function About() {
  return (
    <section className="mx-auto space-y-32">
      <div className="pt-20 md:pt-32 space-y-6 flex flex-col lg:flex-row gap-8 md:gap-14 justify-around items-center">
        <div className="overflow-hidden md:h-full rounded-xl shadow-lg border-4 border-gray-200/10 group">
          <Image
            src="/my_pic.JPG"
            alt="my pfp"
            height={700}
            width={700}
            className="max-w-xs max-h-[400px] md:mx-auto object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        </div>{" "}
        <div className="space-y-8 ">
          <h2 className="text-muted-foreground after:content-[''] after:size-2 after:bg-destructive after:rounded-full after:inline-block after:ml-2">About me</h2>
          <div className="md:text-lg leading-relaxed max-w-3xl space-y-4">
            <p>
              I&apos;m a passionate software developer. I enjoy
              building web applications and constantly strive to improve. My
              goal is to create meaningful solutions that make a positive
              impact.
            </p>
            <p>
              I&apos;m always up for tech discussions, collaborations, or just
              geeking out about anime or space. Feel free to reach out!
            </p>
          </div>
          <div className="flex items-center gap-6 text-2xl">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#eee] hover:drop-shadow-[0_0_8px_#eee]"
            >
              <LuGithub />
            </a>
            <a
              href={profile.linkenIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0077b5] hover:drop-shadow-[0_0_8px_#0077b5]"
            >
              <LuLinkedin />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E4405F] hover:drop-shadow-[0_0_8px_#E4405F]"
            >
              <LuInstagram />
            </a>{" "}
            <a
              href={profile.resumeLink}
              target="_blank"
              className="inline-flex items-center gap-2 group relative overflow-hidden text-2xl hover:text-destructive "
              rel="noopener noreferrer"
            >
              Résumé{" "}
              <LuArrowRight className="-rotate-45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-destructive" />
            </a>
          </div>
        </div>
      </div>
      <div className="space-y-20">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-14">
          <h3 className="text-2xl md:text-4xl md:min-w-[25%]">Skills</h3>
          <div className="text-6xl flex flex-wrap gap-1 md:gap-x-4 gap-y-14 *:w-20">
            {technologies.map((tech) => {
              if (!technologiesCollection[tech]) return null;

              const { name, icon } = technologiesCollection[tech];
              return (
                <div key={tech}>
                  <TooltipComponent content={name}>
                    <Image
                      src={icon}
                      alt={name}
                      width={80}
                      height={80}
                      className="size-14 md:size-16"
                    />
                  </TooltipComponent>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-14">
          <h3 className="text-2xl md:text-4xl md:min-w-[25%]">Tools</h3>
          <div className="text-6xl flex flex-wrap gap-1 md:gap-x-4 gap-y-14 *:w-20">
            {tools.map((tool) => {
              if (!technologiesCollection[tool]) return null;
              const { name, icon } = technologiesCollection[tool];
              return (
                <div key={tool}>
                  <TooltipComponent content={name}>
                    <Image
                      src={icon}
                      alt={name}
                      width={80}
                      height={80}
                      className="size-14 md:size-16"
                    />
                  </TooltipComponent>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}