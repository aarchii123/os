import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/process-sync", label: "Process Sync" },
    { href: "/multithreading", label: "Multithreading" },
    { href: "/virtual-memory", label: "Virtual Memory" }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              OS Concepts
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 relative">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  location === href && "text-primary"
                )}>
                  {label}
                  {location === href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 right-0 h-0.5 bg-primary bottom-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t bg-background/95 backdrop-blur"
        >
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a 
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md",
                    location === href && "bg-primary/10 text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}