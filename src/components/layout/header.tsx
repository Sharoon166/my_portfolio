"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LuCodeXml,
  LuHouse,
  LuUser,
  LuGithub,
  LuLinkedin,
  LuInstagram,
  LuFileText,
} from "react-icons/lu";
import Image from "next/image";
import { profile } from "@/constants";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home", icon: <LuHouse /> },
    { href: "/projects", label: "Projects", icon: <LuCodeXml /> },
    { href: "/about", label: "About", icon: <LuUser /> },
  ];

  useEffect(() => {
    function handleWindowResize() {
      setMobileMenuOpen(false);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <header className="flex justify-between items-center relative">
      <Link href="/">
        <h2 className="inline-flex items-center gap-1.5 text-2xl text-zinc-200 font-semibold font-caveat">
          <Image
            src="/logo_bw.png"
            alt="logo"
            width={40}
            height={40}
            className="size-10"
          />{" "}
          <span>Sharoon S.</span>
        </h2>
      </Link>
      {/* Desktop Navigation */}
      <nav aria-label="Desktop navigation" className="hidden sm:block">
        <ul className="flex gap-4" role="list">
          {menuItems.map((item) => (
            <li key={item.href} className="relative">
              {pathname === item.href && (
                <motion.div
                  layoutId="desktopIndicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-destructive rounded-full"
                  aria-hidden="true"
                />
              )}
              <Link
                href={item.href}
                className={cn(
                  "navlink",
                  pathname === item.href && "text-destructive"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="text-muted-foreground text-mono">
            <kbd>⌘ K</kbd>
            <span className="text-xs text-poppins"> or </span>
            <kbd>/</kbd>
          </li>
        </ul>
      </nav>
      {/* Mobile Menu Button */}
      <motion.button
        className="sm:hidden z-50 cursor-pointer"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label="Menu"
      >
        <motion.div
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { rotate: 90 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              variants={{
                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                open: { d: "M18 6L6 18M6 6l12 12" },
              }}
            />
          </motion.svg>
        </motion.div>
      </motion.button>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 sm:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-0 left-0 w-full h-[70vh] bg-background/95 backdrop-blur-xs z-40 sm:hidden p-8 border-b-2 border-border/70 rounded-b-[5rem] shadow-lg"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <nav
                aria-label="Mobile navigation"
                className="h-full flex flex-col"
              >
                <ul
                  className="grow flex flex-col justify-center gap-8"
                  role="list"
                >
                  {[
                    ...menuItems,
                    {
                      href: profile.resumeLink,
                      label: "Résumé",
                      icon: <LuFileText />,
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="relative group"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "text-xl font-normal transition-all duration-300 flex items-center gap-4 justify-center relative hover:scale-105",
                          pathname === item.href
                            ? "text-destructive font-medium"
                            : "text-foreground hover:text-muted-foreground"
                        )}
                        target={
                          item.href === profile.resumeLink ? "_blank" : ""
                        }
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                      >
                        <span className="transform transition-transform duration-300 ease-in-out group-hover:scale-110">
                          {item.icon}
                        </span>
                        <span className="transform transition-transform duration-300 ease-in-out group-hover:translate-x-2">
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex justify-center gap-8">
                  <Link
                    href={profile.github}
                    target="_blank"
                    className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LuGithub />
                  </Link>
                  <Link
                    href={profile.linkenIn}
                    target="_blank"
                    className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LuLinkedin />
                  </Link>
                  <Link
                    href={profile.instagram}
                    target="_blank"
                    className="text-2xl text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LuInstagram />
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>{" "}
    </header>
  );
}
