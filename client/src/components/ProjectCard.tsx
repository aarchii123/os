import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ProjectCard({ title, description, href }: ProjectCardProps) {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group overflow-hidden"
        onClick={() => setLocation(href)}
      >
        <CardHeader className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 group-hover:text-primary/80 transition-colors">
            {description}
          </CardDescription>
          <motion.div
            className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </motion.div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}