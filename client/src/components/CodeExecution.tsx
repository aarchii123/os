import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface CodeExecutionProps {
  output: string[];
  isRunning: boolean;
}

export default function CodeExecution({ output, isRunning }: CodeExecutionProps) {
  return (
    <Card className="mt-4 p-4 bg-muted/50">
      <h3 className="text-sm font-medium mb-2">Execution Output</h3>
      <div className="font-mono text-sm space-y-1">
        <AnimatePresence>
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
        {isRunning && (
          <motion.div
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-primary"
          >
            &gt; Running...
          </motion.div>
        )}
      </div>
    </Card>
  );
}
