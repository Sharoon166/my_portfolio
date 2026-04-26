"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Home01Icon, 
  CodeIcon, 
  Note01Icon, 
  UserIcon, 
  GithubIcon, 
  Linkedin01Icon, 
  InstagramIcon 
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { profile } from "@/constants";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { href: "/", label: "Home", icon: <HugeiconsIcon icon={Home01Icon} size={18} /> },
    { href: "/projects", label: "Projects", icon: <HugeiconsIcon icon={CodeIcon} size={18} /> },
    { href: "/case-studies", label: "Case Studies", icon: <HugeiconsIcon icon={Note01Icon} size={18} /> },
    { href: "/about", label: "About", icon: <HugeiconsIcon icon={UserIcon} size={18} /> },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => setMobileMenuOpen(false));
    return () => window.removeEventListener("resize", () => setMobileMenuOpen(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Header ── */}
      <motion.header
        className="fixed z-50 flex justify-between items-center"
        style={{ left: 0, right: 0, marginLeft: "auto", marginRight: "auto" }}
        initial={{
          top: 0,
          width: "min(1400px, 100%)",
          padding: "16px 32px",
          borderRadius: 0,
          backgroundColor: "rgba(10,10,10,0)",
          backdropFilter: "blur(0px)",
          borderWidth: 0,
          boxShadow: "0 0px 0px rgba(0,0,0,0)",
        }}
        animate={{
          top: scrolled ? 12 : 0,
          width: scrolled ? "min(560px, 90vw)" : "min(1400px, 100%)",
          padding: scrolled ? "12px 24px" : "16px 32px",
          borderRadius: scrolled ? 9999 : 0,
          backgroundColor: scrolled ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          borderWidth: scrolled ? 0.5 : 0,
          borderColor: "rgba(255,255,255,0.08)",
          borderStyle: "solid",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Logo — no size animation, just static */}
        <Link href="/">
          <h2 className="inline-flex items-center gap-1.5 text-xl text-muted-foreground font-semibold font-caveat">
            <Image src="/logo_bw.png" alt="logo" width={32} height={32} />
            <span className={cn(scrolled && "hidden")}>Sharoon S.</span>
          </h2>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:block" aria-label="Desktop navigation">
          <ul className="flex gap-4 items-center" role="list">
            {menuItems.map((item) => (
              <li key={item.href} className="relative">
                {pathname === item.href && (
                  <motion.div
                    layoutId="indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-destructive rounded-full"
                  />
                )}
                <Link
                  href={item.href}
                  className={cn("navlink", pathname === item.href && "text-destructive")}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={cn("text-muted-foreground text-mono", scrolled && "hidden")}>
              <kbd>⌘ K</kbd>
              <span className="text-xs"> or </span>
              <kbd>/</kbd>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden z-50 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Menu"
        >
          <motion.svg
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              animate={mobileMenuOpen
                ? { d: "M18 6L6 18M6 6l12 12" }
                : { d: "M4 6h16M4 12h16M4 18h16" }
              }
              transition={{ duration: 0.2 }}
            />
          </motion.svg>
        </button>
      </motion.header>

      {/* ── Mobile menu — OUTSIDE header so y:100% works correctly ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-40 sm:hidden mb-0"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* drawer — slides up from actual bottom of screen */}
            <motion.div
              initial={{ y: "100%" }}   // now 100% of viewport, not header
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 w-full bg-black/90 z-100 sm:hidden px-8 pt-10 pb-8 border-t border-border/70 rounded-t-[2.5rem] shadow-xl mb-0"
              role="dialog"
              aria-modal="true"
            >
              <nav className="flex flex-col gap-10" aria-label="Mobile navigation">
                <ul className="flex flex-col gap-5" role="list">
                  {[
                    ...menuItems,
                    { href: profile.resumeLink, label: "Résumé", icon: <HugeiconsIcon icon={Note01Icon} size={20} /> },
                  ].map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 22 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        target={item.href === profile.resumeLink ? "_blank" : undefined}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn(
                          "text-xl flex items-center gap-4 transition-colors py-1",
                          pathname === item.href
                            ? "text-destructive font-semibold"
                            : "text-foreground hover:text-muted-foreground"
                        )}
                      >
                        <span className={cn(
                          "transition-colors",
                          pathname === item.href ? "text-destructive" : "text-muted-foreground"
                        )}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* social links */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                  {[
                    { href: profile.github, icon: <HugeiconsIcon icon={GithubIcon} size={22} /> },
                    { href: profile.linkenIn, icon: <HugeiconsIcon icon={Linkedin01Icon} size={22} /> },
                    { href: profile.instagram, icon: <HugeiconsIcon icon={InstagramIcon} size={22} /> },
                  ].map(({ href, icon }) => (
                    <Link
                      key={href}
                      href={href}
                      target="_blank"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {icon}
                    </Link>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}