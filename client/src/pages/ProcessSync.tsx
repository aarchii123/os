import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import CodeExecution from '@/components/CodeExecution';

const semaphoreCode = `public class SemaphoreExample {
    private static Semaphore semaphore = new Semaphore(1);
    private static int count = 0;

    static class Worker extends Thread {
        public void run() {
            try {
                semaphore.acquire();
                count++;
                System.out.println("Thread " + 
                    Thread.currentThread().getId() + 
                    " incremented count to " + count);
                Thread.sleep(1000);
                semaphore.release();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}`;

export default function ProcessSync() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    const simulation = [
      "Thread 1 acquired semaphore",
      "Thread 1 incremented count to 1",
      "Thread 1 released semaphore",
      "Thread 2 acquired semaphore",
      "Thread 2 incremented count to 2",
      "Thread 2 released semaphore"
    ];

    simulation.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (i === simulation.length - 1) {
          setIsRunning(false);
        }
      }, i * 1000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Process Synchronization</h1>
      
      <div className="prose dark:prose-invert mb-8">
        <p>
          Process synchronization is crucial in operating systems to prevent race conditions
          and ensure orderly access to shared resources. Semaphores are one of the fundamental
          synchronization tools.
        </p>
      </div>

      <div className="space-y-6">
        <CodeBlock code={semaphoreCode} onExecute={executeCode} />
        <CodeExecution output={output} isRunning={isRunning} />
      </div>
    </motion.div>
  );
}
