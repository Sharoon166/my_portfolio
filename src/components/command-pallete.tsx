"use client";

"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Calendar03Icon,
  FileDownloadIcon,
  FolderCodeIcon,
  GithubIcon,
  Home01Icon,
  InstagramIcon,
  Linkedin01Icon,
  UserIcon,
  Search01Icon,
  DashboardSquare01Icon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { DialogTitle } from "./ui/dialog";
import { profile, projects } from "@/constants";
import { cn } from "@/lib/utils";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleNavigation = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const downloadResume = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sharoon-Shaleem-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)]">


          <DialogTitle className="sr-only">Command Palette</DialogTitle>

          <div className="relative z-10">
            <div className="flex items-center border-b border-white/5 px-4 py-3 justify-between bg-white/5">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for new opportunities
              </div>
              
            </div>

            <CommandInput
              placeholder="Search projects, pages, or links..."
              className="h-14 border-none bg-transparent text-base focus:ring-0 placeholder:text-zinc-500"
            />

            <CommandList className="max-h-[400px] scrollbar-hide py-2 px-1">
              <CommandEmpty className="py-12 text-center">
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <HugeiconsIcon icon={Search01Icon} size={24} />
                  <p className="text-sm font-medium">No results found.</p>
                </div>
              </CommandEmpty>

              <CommandGroup heading={<span className="px-2 text-xs font-semibold uppercase tracking-wider opacity-40">Pages</span>}>
                <CommandItem onSelect={() => handleNavigation("/")} className="group/item py-3">
                  <HugeiconsIcon icon={Home01Icon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium">Home</span>
                  <CommandShortcut className="text-xs opacity-20 group-data-[selected=true]:opacity-100 transition-opacity">H</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => handleNavigation("/case-studies")} className="group/item py-3">
                  <HugeiconsIcon icon={DashboardSquare01Icon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium">Case Studies</span>
                  <CommandShortcut className="text-xs opacity-20 group-data-[selected=true]:opacity-100 transition-opacity">C</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => handleNavigation("/about")} className="group/item py-3">
                  <HugeiconsIcon icon={UserIcon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium">About</span>
                  <CommandShortcut className="text-xs opacity-20 group-data-[selected=true]:opacity-100 transition-opacity">A</CommandShortcut>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="my-2 bg-white/5 mx-2" />
              <CommandGroup heading={<span className="px-2 text-xs font-semibold uppercase tracking-wider opacity-40">General</span>}>
                <CommandItem onSelect={() => downloadResume(profile.resumeLink)} className="group/item py-3">
                  <HugeiconsIcon icon={FileDownloadIcon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium">Download Résumé</span>
                  <CommandShortcut className="text-xs opacity-20 group-data-[selected=true]:opacity-100 transition-opacity">R</CommandShortcut>
                </CommandItem>
                <CommandItem onSelect={() => openInNewTab(profile.meeting)} className="group/item py-3">
                  <HugeiconsIcon icon={Calendar03Icon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium">Schedule a Meeting</span>
                  <CommandShortcut className="text-xs opacity-20 group-data-[selected=true]:opacity-100 transition-opacity">M</CommandShortcut>
                </CommandItem>
              </CommandGroup> 

              <CommandSeparator className="my-2 bg-white/5 mx-2" />

              <CommandGroup heading={<span className="px-2 text-xs font-semibold uppercase tracking-wider opacity-40">Projects</span>}>
                {projects
                  .filter((project) => project.caseStudyId)
                  .map((project) => (
                    <CommandItem
                      key={project.title}
                      onSelect={() => handleNavigation(`/case-studies/${project.caseStudyId}`)}
                      className="group/item py-3"
                    >
                      <HugeiconsIcon icon={FolderCodeIcon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                      <div className="flex flex-col grow min-w-0">
                        <span className="font-medium truncate">{project.title}</span>
                        <span className="text-xs text-muted-foreground opacity-0 group-data-[selected=true]:opacity-60 transition-opacity">View project details</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-sm bg-destructive/10 text-destructive border border-destructive/20 ml-2 uppercase">Case Study</span>
                    </CommandItem>
                  ))}
              </CommandGroup>

              <CommandSeparator className="my-2 bg-white/5 mx-2" />

              <CommandGroup heading={<span className="px-2 text-xs font-semibold uppercase tracking-wider opacity-40">Socials</span>}>
                <CommandItem onSelect={() => openInNewTab(profile.github)} className="group/item py-3">
                  <HugeiconsIcon icon={GithubIcon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium grow">GitHub</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="opacity-0 group-data-[selected=true]:opacity-50 transition-opacity -rotate-45" />
                </CommandItem>
                <CommandItem onSelect={() => openInNewTab(profile.linkenIn)} className="group/item py-3">
                  <HugeiconsIcon icon={Linkedin01Icon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium grow">LinkedIn</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="opacity-0 group-data-[selected=true]:opacity-50 transition-opacity -rotate-45" />
                </CommandItem>
                <CommandItem onSelect={() => openInNewTab(profile.instagram)} className="group/item py-3">
                  <HugeiconsIcon icon={InstagramIcon} size={18} className="mr-3 text-zinc-500 group-data-[selected=true]:text-destructive transition-colors" />
                  <span className="font-medium grow">Instagram</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="opacity-0 group-data-[selected=true]:opacity-50 transition-opacity -rotate-45" />
                </CommandItem>
              </CommandGroup>
            </CommandList>

            <div className="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between text-xs text-muted-foreground/40">
              <div className="flex gap-4">
                <span>Navigate with <span className="text-destructive font-bold">↑ ↓</span></span>
                <span>Select with <span className="text-destructive font-bold">ENTER</span></span>
              </div>
              <div className="flex gap-2 items-center">
                Built by Sharoon.dev
              </div>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}
