"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  Copy01Icon,
  DashboardSquare01Icon,
  Delete01Icon,
  FileDownloadIcon,
  FolderCodeIcon,
  GithubIcon,
  Home01Icon,
  InstagramIcon,
  Link01Icon,
  Linkedin01Icon,
  Search01Icon,
  TransactionHistoryIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "./ui/dialog";
import { profile, projects, minorProjects } from "@/constants";
import { cn } from "@/lib/utils";

type ItemGroup = "Pages" | "Projects" | "Actions" | "Socials";
type Tab = "All" | ItemGroup;

type PaletteItem = {
  id: string;
  group: ItemGroup;
  label: string;
  hint?: string;
  keywords?: string[];
  icon: React.ReactNode;
  badge?: string;
  thumb?: string;
  accent?: string;
  external?: boolean;
  run: () => void;
};

const TABS: Tab[] = ["All", "Pages", "Projects", "Actions", "Socials"];
const GROUP_ORDER: ItemGroup[] = ["Pages", "Actions", "Projects", "Socials"];
const RECENTS_KEY = "sharoon.cmd.recents";
const MAX_RECENTS = 5;

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-medium text-destructive">
        {text.slice(idx, idx + q.length)}
      </span>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [recents, setRecents] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(RECENTS_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && isTyping) return;
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
    } catch {
      /* storage unavailable */
    }
  }, [recents]);

  const addRecent = (id: string) =>
    setRecents((prev) => [id, ...prev.filter((r) => r !== id)].slice(0, MAX_RECENTS));

  const notify = (message: string) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });

  const navigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = profile.resumeLink;
    link.download = "Sharoon-Shaleem-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
    notify("Résumé download started");
  };

  const copyText = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(false);
      notify(message);
    } catch {
      toast.error("Couldn't copy to clipboard", {
        position: "bottom-right",
        theme: "dark",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const makeIcon = (icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]) => (
    <HugeiconsIcon
      icon={icon}
      size={18}
      className="text-zinc-500 transition-colors duration-150 group-data-[selected=true]/item:text-destructive"
    />
  );

  const items: PaletteItem[] = [
    { id: "page:home", group: "Pages", label: "Home", hint: "Back to the start", icon: makeIcon(Home01Icon), run: () => navigate("/") },
    { id: "page:case-studies", group: "Pages", label: "Case Studies", hint: "Deep dives into selected projects", icon: makeIcon(DashboardSquare01Icon), run: () => navigate("/case-studies") },
    { id: "page:about", group: "Pages", label: "About", hint: "Bio, skills & experience", icon: makeIcon(UserIcon), run: () => navigate("/about") },
    { id: "action:resume", group: "Actions", label: "Download Résumé", hint: "Get a copy of my CV", icon: makeIcon(FileDownloadIcon), run: downloadResume },
    { id: "action:meeting", group: "Actions", label: "Schedule a Meeting", hint: "Book a 30 min call", icon: makeIcon(Calendar03Icon), run: () => openExternal(profile.meeting) },
    { id: "action:email", group: "Actions", label: "Copy Email", hint: profile.email, icon: makeIcon(Copy01Icon), run: () => copyText(profile.email, "Email copied to clipboard") },
    { id: "action:copy-url", group: "Actions", label: "Copy Page URL", hint: "Link to this page", icon: makeIcon(Link01Icon), run: () => copyText(window.location.href, "Page URL copied to clipboard") },
    { id: "action:top", group: "Actions", label: "Back to Top", hint: "Scroll to the top", icon: makeIcon(ArrowUp01Icon), run: scrollToTop },
    ...projects.map((project) => ({
      id: `project:${project.title.toLowerCase()}`,
      group: "Projects" as const,
      label: project.title,
      hint: project.description,
      keywords: [...project.technologies, ...(project.categories ?? [])],
      icon: makeIcon(FolderCodeIcon),
      thumb: project.image,
      accent: project.themeColor,
      badge: project.caseStudyId
        ? "Case Study"
        : project.previewUrl
          ? "Live"
          : project.githubUrl
            ? "Code"
            : undefined,
      external: !project.caseStudyId && !!project.previewUrl,
      run: () =>
        project.caseStudyId
          ? navigate(`/case-studies/${project.caseStudyId}`)
          : project.previewUrl
            ? openExternal(project.previewUrl)
            : project.githubUrl
              ? openExternal(project.githubUrl)
              : navigate("/projects"),
    })),
    ...minorProjects.map((project) => ({
      id: `minor:${project.title.toLowerCase()}`,
      group: "Projects" as const,
      label: project.title,
      hint: project.description,
      keywords: project.technologies,
      icon: makeIcon(FolderCodeIcon),
      external: true,
      run: () => openExternal(project.liveUrl),
    })),
    { id: "social:github", group: "Socials", label: "GitHub", hint: "@Sharoon166", external: true, icon: makeIcon(GithubIcon), run: () => openExternal(profile.github) },
    { id: "social:linkedin", group: "Socials", label: "LinkedIn", hint: "Sharoon Shaleem", external: true, icon: makeIcon(Linkedin01Icon), run: () => openExternal(profile.linkenIn) },
    { id: "social:instagram", group: "Socials", label: "Instagram", hint: "@sharoonshaleem", external: true, icon: makeIcon(InstagramIcon), run: () => openExternal(profile.instagram) },
  ];

  const itemById = new Map(items.map((item) => [item.id, item]));
  const recentItems = recents
    .map((id) => itemById.get(id))
    .filter((item): item is PaletteItem => Boolean(item));
  const recentIdSet = new Set(recents);

  const effectiveTab = search.trim() ? "All" : activeTab;

  const q = search.trim().toLowerCase();
  const matchesQuery = (item: PaletteItem) =>
    !q ||
    [item.label, item.hint ?? "", ...(item.keywords ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(q);

  const runItem = (item: PaletteItem) => {
    addRecent(item.id);
    item.run();
  };

  const visibleOrder: PaletteItem[] = [];
  if (search === "" && effectiveTab === "All") visibleOrder.push(...recentItems);
  for (const group of effectiveTab === "All" ? GROUP_ORDER : [effectiveTab]) {
    visibleOrder.push(
      ...items.filter(
        (item) =>
          item.group === group && !recentIdSet.has(item.id) && matchesQuery(item),
      ),
    );
  }

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (search !== "") return;
    const digit = parseInt(e.key, 10);
    if (digit >= 1 && digit <= 9 && visibleOrder[digit - 1]) {
      e.preventDefault();
      runItem(visibleOrder[digit - 1]);
    }
  };

  const renderRow = (item: PaletteItem) => {
    const idx = search === "" ? visibleOrder.indexOf(item) : -1;
    const showDigit = idx >= 0 && idx < 9;
    return (
      <CommandItem
        key={item.id}
        onSelect={() => runItem(item)}
        keywords={item.keywords}
        className="group/item my-0.5 gap-3 rounded-xl px-2.5 py-2.5 transition-colors duration-150 data-[selected=true]:bg-white/[0.06]"
      >
        <div className="relative shrink-0">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/[0.06] transition-colors duration-150 group-data-[selected=true]/item:bg-destructive/10 group-data-[selected=true]/item:ring-destructive/20">
            {item.thumb ? (
              <Image
                src={item.thumb}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              item.icon
            )}
          </div>
          {item.accent && (
            <span
              className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ring-[#0b0b10]"
              style={{ backgroundColor: item.accent }}
            />
          )}
        </div>

        <div className="flex min-w-0 grow flex-col gap-0.5">
          <span className="truncate text-sm font-medium leading-tight">
            <Highlight text={item.label} query={search} />
          </span>
          {item.hint && (
            <span className="truncate text-xs leading-tight text-zinc-500 transition-colors duration-150 group-data-[selected=true]/item:text-zinc-400">
              <Highlight text={item.hint} query={search} />
            </span>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2.5">
          {item.badge && (
            <span className="hidden rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive sm:inline">
              {item.badge}
            </span>
          )}
          {showDigit ? (
            <span className="font-mono text-[10px] leading-none text-zinc-500 opacity-0 transition-opacity duration-150 group-data-[selected=true]/item:opacity-100">
              {idx + 1}
            </span>
          ) : item.external ? (
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              className="text-zinc-500 opacity-0 transition-opacity duration-150 group-data-[selected=true]/item:opacity-100"
            />
          ) : null}
        </div>
      </CommandItem>
    );
  };

  const renderItem = (item: PaletteItem) => renderRow(item);

  const groupBlocks = GROUP_ORDER.filter(
    (group) => effectiveTab === "All" || effectiveTab === group,
  )
    .map((group) => ({
      group,
      items: items.filter(
        (item) =>
          item.group === group && !recentIdSet.has(item.id) && matchesQuery(item),
      ),
    }))
    .filter((block) => block.items.length > 0)
    .map((block, i) => (
      <Fragment key={block.group}>
        {effectiveTab === "All" &&
          (i > 0 || (search === "" && recentItems.length > 0)) && (
            <CommandSeparator className="mx-3 my-2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          )}
        <CommandGroup
          heading={
            <span className="px-1 pt-1 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              {block.group}
            </span>
          }
        >
          {block.items.map(renderItem)}
        </CommandGroup>
      </Fragment>
    ));

  const hasResults = visibleOrder.length > 0;

  return (
    <CommandDialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSearch("");
          setActiveTab("All");
        }
      }}
      loop
      shouldFilter={false}
      className="top-auto bottom-[max(0.75rem,env(safe-area-inset-bottom))] translate-x-[-50%] translate-y-0 w-[calc(100%-1.5rem)] max-w-2xl gap-0 border-0 bg-transparent p-0 shadow-none sm:w-full sm:rounded-none duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-[0.98] data-[state=closed]:zoom-out-[0.98] data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4"
    >
      <div className="relative">
        {/* ambient halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-4/5 -translate-x-1/2 rounded-full bg-destructive/15 blur-3xl"
        />

        <div className="relative overflow-hidden rounded-3xl bg-[#0b0b10]/90 shadow-2xl shadow-black/60 ring-1 ring-white/10 backdrop-blur-2xl">
          <DialogTitle className="sr-only">Command Palette</DialogTitle>

          {/* top hairline */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />

          {/* search */}
          <div className="flex items-center gap-2 px-3 pt-2 pb-1">
            <CommandInput
              value={search}
              onValueChange={setSearch}
              onKeyDown={onInputKeyDown}
              wrapperClassName="min-w-0 flex-1 rounded-2xl bg-white/[0.03] px-4 ring-1 ring-white/[0.05] transition-[background-color,box-shadow] duration-200 focus-within:bg-white/[0.05] focus-within:ring-white/10"
              className="h-11 border-none bg-transparent text-[15px] outline-none placeholder:text-zinc-500"
              placeholder="Search pages, projects, actions..."
            />
            <div className="hidden shrink-0 select-none items-center rounded-lg bg-white/[0.03] px-2 py-1.5 font-mono text-[11px] text-zinc-500 ring-1 ring-white/[0.05] sm:flex">
              esc
            </div>
          </div>

          {/* tabs */}
          <div className="scrollbar-hide flex gap-1.5 overflow-x-auto px-4 pt-1.5 pb-2">
            {TABS.map((tab) => {
              const active = effectiveTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setSearch("");
                  }}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-150",
                    active
                      ? "bg-destructive/15 text-destructive"
                      : "text-zinc-500 hover:bg-white/4 hover:text-zinc-200",
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <CommandList className="scrollbar-hide max-h-[min(48vh,400px)] px-1.5 pb-1.5">
            {!hasResults && (
              <div className="px-4 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 ring-1 ring-white/6">
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={20}
                    className="text-zinc-500"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-zinc-200">
                  No results for{" "}
                  <span className="text-destructive">“{search}”</span>
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Try “react”, “resume”, “github” or “meeting”
                </p>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-full bg-white/4 px-3.5 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition-colors hover:bg-white/8 hover:text-zinc-100"
                >
                  Clear search
                </button>
              </div>
            )}

            {search === "" && effectiveTab === "All" && recentItems.length > 0 && (
              <>
                <CommandGroup
                  heading={
                    <div className="flex items-center justify-between px-1 pr-2">
                      <span className="flex items-center gap-1.5 pt-1 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        <HugeiconsIcon icon={TransactionHistoryIcon} size={12} />
                        Recents
                      </span>
                      <button
                        type="button"
                        onClick={() => setRecents([])}
                        className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={12} />
                        Clear
                      </button>
                    </div>
                  }
                >
                  {recentItems.map(renderRow)}
                </CommandGroup>
                <CommandSeparator className="mx-3 my-2 bg-linear-to-r from-transparent via-white/10 to-transparent" />
              </>
            )}

            {groupBlocks}
          </CommandList>

          {/* footer */}
          <div className="flex items-center justify-between border-t border-white/6 bg-white/2 px-4 py-2.5 text-[11px] text-zinc-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-zinc-400">↑↓</span>
                Navigate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] text-zinc-400">↵</span>
                Select
              </span>
              <span className="hidden items-center gap-1.5 sm:flex">
                <span className="font-mono text-[10px] text-zinc-400">esc</span>
                Close
              </span>
            </div>
            <span className="hidden sm:inline">Built by Sharoon.dev</span>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}
