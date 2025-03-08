import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="font-bold text-2xl mr-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            OS Concepts
          </a>
        </Link>
        <div className="flex gap-8 relative">
          {[
            { href: "/process-sync", label: "Process Sync" },
            { href: "/multithreading", label: "Multithreading" },
            { href: "/virtual-memory", label: "Virtual Memory" }
          ].map(({ href, label }) => (
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
    </nav>
  );
}