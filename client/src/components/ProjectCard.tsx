import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLocation } from "wouter";

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
        className="cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setLocation(href)}
      >
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
