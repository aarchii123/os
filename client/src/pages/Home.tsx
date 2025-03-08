import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto pt-4 md:pt-8 px-4">
      <motion.div
        variants={fadeUpItem}
        initial="hidden"
        animate="show"
        className="text-center mb-12 md:mb-16"
      >
        <div className="inline-block">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Operating System Concepts
          </motion.h1>
        </div>
        <motion.p 
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Explore key OS concepts through interactive examples and visualizations.
          Learn by doing with our hands-on approach to understanding complex systems.
        </motion.p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3"
      >
        <ProjectCard
          title="Process Synchronization"
          description="Implement resource allocation with race condition handling using semaphores and monitors. Visualize and fix concurrent access issues in real-time."
          href="/process-sync"
        />
        <ProjectCard
          title="Multithreading"
          description="Build a multithreaded Sudoku validator using parallel processing. Watch as multiple threads simultaneously validate rows, columns, and subgrids."
          href="/multithreading"
        />
        <ProjectCard
          title="Virtual Memory"
          description="Simulate virtual memory management with TLB and page table. Track address translation, page faults, and replacement algorithms with live statistics."
          href="/virtual-memory"
        />
      </motion.div>
    </div>
  );
}