import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t mt-auto py-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="container mx-auto px-4 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Made with 💻 by{" "}
          <span className="font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Aarchi
          </span>
        </p>
      </motion.div>
    </footer>
  );
}
