"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
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
import {
  LuArrowUpRight,
  LuCalendarDays,
  LuFileDown,
  LuFolderCode,
  LuGithub,
  LuHouse,
  LuInstagram,
  LuLinkedin,
  LuUser,
} from "react-icons/lu";
import { DialogTitle } from "./ui/dialog";
import { profile } from "@/constants";

export default function CommandDialogDemo() {
  const [open, setOpen] = useState(false);

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

  const openInNewTab = (url: string, download = false) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false)
  };

  const handleNavigation = (url: string) => {
    setOpen(!open)
    redirect(url);
  }

  const downloadResume = (url: string, fileName?: string) => {
  const link = document.createElement("a");
  link.href = url;

  link.download = fileName || url.split("/").pop() || "resume.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-xs"
        style={{ display: open ? "block" : "none" }}
      >
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
        >
          <div className="rounded-xl overflow-hidden backdrop-blur-xl bg-white dark:bg-zinc-950/30 border border-white/20 dark:border-zinc-800/20 shadow-2xl">
            <DialogTitle className="sr-only">
              <span>Press &quot;⌘ + K&quot; to open</span>
            </DialogTitle>
            <CommandInput
              placeholder="Type a command or search..."
              className="border-none bg-transparent focus:ring-0 "
            />
            <CommandList className="bg-transparent">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem
                  onSelect={() => handleNavigation("/")}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuHouse className="mr-2 h-4 w-4 text-destructive" />
                  <span>Home</span>
                  <CommandShortcut>H</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => handleNavigation("/projects")}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuFolderCode className="mr-2 h-4 w-4 text-destructive" />
                  <span>Projects</span>
                  <CommandShortcut>P</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => handleNavigation("/about")}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuUser className="mr-2 h-4 w-4 text-destructive" />
                  <span>About</span>
                  <CommandShortcut>A</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator className="bg-white/20 dark:bg-gray-800/20" />
              <CommandGroup heading="General">
                <CommandItem
                  onSelect={() => downloadResume(profile.resume)}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuFileDown className="mr-2 h-4 w-4 text-destructive" />
                  <span>Download Résumé</span>
                  <CommandShortcut>R</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => openInNewTab(profile.meeting)}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuCalendarDays className="mr-2 h-4 w-4 text-destructive" />
                  <span>Connect with Me</span>
                  <CommandShortcut>M</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator className="bg-white/20 dark:bg-gray-800/20" />
              <CommandGroup heading="Socials">
                <CommandItem
                  onSelect={() => openInNewTab(profile.github)}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuGithub className="mr-2 h-4 w-4 text-destructive" />
                  <span className="grow">Github</span>
                  <LuArrowUpRight className="text-destructive" />
                </CommandItem>
                <CommandItem
                  onSelect={() => openInNewTab(profile.linkenIn)}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuLinkedin className="mr-2 h-4 w-4 text-destructive" />
                  <span className="grow">LinkedIn</span>
                  <LuArrowUpRight className="text-destructive" />
                </CommandItem>
                <CommandItem
                  onSelect={() => openInNewTab(profile.instagram)}
                  className="rounded-lg hover:bg-white/20 cursor-pointer"
                >
                  <LuInstagram className="mr-2 h-4 w-4 text-destructive" />
                  <span className="grow">Instagram</span>
                  <LuArrowUpRight className="text-destructive" />
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </div>
        </CommandDialog>
      </div>
    </>
  );
}
