import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9"
    >
      <motion.div
        initial={false}
        animate={{ 
          scale: theme === "light" ? 1 : 0,
          opacity: theme === "light" ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          scale: theme === "dark" ? 1 : 0,
          opacity: theme === "dark" ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}