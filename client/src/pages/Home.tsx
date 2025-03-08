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

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Operating System Concepts
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore key OS concepts through interactive examples and visualizations
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        <ProjectCard
          title="Process Synchronization"
          description="Learn about process synchronization mechanisms including semaphores and monitors"
          href="/process-sync"
        />
        <ProjectCard
          title="Multithreading"
          description="Understand multithreading concepts and implementation in Java"
          href="/multithreading"
        />
        <ProjectCard
          title="Virtual Memory"
          description="Explore virtual memory management and paging algorithms"
          href="/virtual-memory"
        />
      </motion.div>
    </div>
  );
}
