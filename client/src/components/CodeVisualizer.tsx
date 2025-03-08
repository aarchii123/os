import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface Variable {
  name: string;
  value: string | number;
  type: string;
}

interface ExecutionState {
  lineNumber: number;
  variables: Variable[];
  output?: string;
}

interface CodeVisualizerProps {
  code: string;
  executionStates: ExecutionState[];
  isRunning: boolean;
  onComplete?: () => void;
}

export default function CodeVisualizer({ 
  code, 
  executionStates, 
  isRunning,
  onComplete 
}: CodeVisualizerProps) {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [currentState, setCurrentState] = useState<ExecutionState | null>(null);
  const codeLines = code.split('\n');

  useEffect(() => {
    if (!isRunning) {
      setCurrentStateIndex(0);
      setCurrentState(null);
      return;
    }

    if (currentStateIndex >= executionStates.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setCurrentState(executionStates[currentStateIndex]);
      setCurrentStateIndex(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, currentStateIndex, executionStates, onComplete]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2 overflow-hidden border-2">
        <div className="bg-muted dark:bg-muted/20 p-3">
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Code Execution
          </span>
        </div>
        <div className="p-4 font-mono text-[13px] md:text-sm relative">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              className={`px-2 ${
                currentState?.lineNumber === index + 1 
                ? 'bg-primary/10 border-l-2 border-primary' 
                : ''
              }`}
              initial={false}
              animate={{
                backgroundColor: currentState?.lineNumber === index + 1 
                  ? 'var(--primary-10)' 
                  : 'transparent'
              }}
            >
              <span className="mr-4 text-muted-foreground select-none">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              {line}
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden border-2">
        <div className="bg-muted dark:bg-muted/20 p-3">
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Variables
          </span>
        </div>
        <div className="p-4">
          <AnimatePresence mode="wait">
            {currentState && (
              <motion.div
                key={currentStateIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                {currentState.variables.map((variable, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{variable.name}</span>
                    <motion.span
                      key={`${variable.value}`}
                      initial={{ scale: 1.2, color: 'var(--primary)' }}
                      animate={{ scale: 1, color: 'inherit' }}
                      className="text-sm font-mono"
                    >
                      {variable.value}
                    </motion.span>
                  </div>
                ))}
                {currentState.output && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Output:</p>
                    <p className="text-sm font-mono mt-1">{currentState.output}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
