import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import CodeExecution from '@/components/CodeExecution';

const threadCode = `public class ThreadExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new Runnable() {
            public void run() {
                for(int i = 0; i < 3; i++) {
                    System.out.println("Thread 1: Count " + i);
                    try {
                        Thread.sleep(1000);
                    } catch(InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        });
        
        thread1.start();
    }
}`;

export default function Multithreading() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    const simulation = [
      "Thread 1: Count 0",
      "Thread 1: Count 1",
      "Thread 1: Count 2",
      "Thread execution completed"
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
      <h1 className="text-3xl font-bold mb-6">Multithreading</h1>
      
      <div className="prose dark:prose-invert mb-8">
        <p>
          Multithreading allows multiple threads of execution within a program.
          Each thread represents an independent path of execution, enabling
          concurrent processing and improved performance.
        </p>
      </div>

      <div className="space-y-6">
        <CodeBlock code={threadCode} onExecute={executeCode} />
        <CodeExecution output={output} isRunning={isRunning} />
      </div>
    </motion.div>
  );
}
