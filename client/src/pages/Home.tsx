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
    <div className="max-w-4xl mx-auto pt-8">
      <motion.div
        variants={fadeUpItem}
        initial="hidden"
        animate="show"
        className="text-center mb-16"
      >
        <div className="inline-block">
          <motion.h1 
            className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Operating System Concepts
          </motion.h1>
        </div>
        <motion.p 
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
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
        className="grid gap-8 md:grid-cols-3"
      >
        <ProjectCard
          title="Process Synchronization"
          description="Learn about process synchronization mechanisms including semaphores and monitors through interactive demonstrations."
          href="/process-sync"
        />
        <ProjectCard
          title="Multithreading"
          description="Understand multithreading concepts and implementation in Java with real-time visualization of thread execution."
          href="/multithreading"
        />
        <ProjectCard
          title="Virtual Memory"
          description="Explore virtual memory management and paging algorithms through interactive simulations and examples."
          href="/virtual-memory"
        />
      </motion.div>
    </div>
  );
}