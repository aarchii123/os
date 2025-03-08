import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <a className="font-bold text-xl text-primary mr-8">OS Concepts</a>
        </Link>
        <div className="flex gap-6">
          <Link href="/process-sync">
            <a className={cn(
              "text-sm transition-colors hover:text-primary",
              location === "/process-sync" && "text-primary font-medium"
            )}>
              Process Sync
            </a>
          </Link>
          <Link href="/multithreading">
            <a className={cn(
              "text-sm transition-colors hover:text-primary",
              location === "/multithreading" && "text-primary font-medium"
            )}>
              Multithreading
            </a>
          </Link>
          <Link href="/virtual-memory">
            <a className={cn(
              "text-sm transition-colors hover:text-primary",
              location === "/virtual-memory" && "text-primary font-medium"
            )}>
              Virtual Memory
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
