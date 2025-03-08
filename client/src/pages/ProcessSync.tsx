import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import CodeExecution from '@/components/CodeExecution';
import CodeVisualizer from '@/components/CodeVisualizer';

const semaphoreCode = `public class ResourceManager {
    private static final int MAX_LICENSES = 3;
    private static Semaphore licenseSemaphore = new Semaphore(MAX_LICENSES);
    private static int activeUsers = 0;

    static class User extends Thread {
        private final int id;

        public User(int id) {
            this.id = id;
        }

        public void run() {
            try {
                System.out.println("User " + id + " requesting license...");
                licenseSemaphore.acquire();

                synchronized(ResourceManager.class) {
                    activeUsers++;
                    System.out.println("User " + id + 
                        " acquired license. Active users: " + activeUsers);
                }

                // Simulate using the license
                Thread.sleep(2000);

                synchronized(ResourceManager.class) {
                    activeUsers--;
                    System.out.println("User " + id + 
                        " released license. Active users: " + activeUsers);
                }

                licenseSemaphore.release();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        for(int i = 1; i <= 5; i++) {
            new User(i).start();
        }
    }
}`;

export default function ProcessSync() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executionStates = [
    {
      lineNumber: 2,
      variables: [
        { name: 'MAX_LICENSES', value: 3, type: 'int' },
        { name: 'activeUsers', value: 0, type: 'int' }
      ]
    },
    {
      lineNumber: 41,
      variables: [
        { name: 'MAX_LICENSES', value: 3, type: 'int' },
        { name: 'activeUsers', value: 0, type: 'int' }
      ],
      output: "Starting simulation with 5 users..."
    },
    {
      lineNumber: 14,
      variables: [
        { name: 'activeUsers', value: 0, type: 'int' },
        { name: 'id', value: 1, type: 'int' },
        { name: 'availableLicenses', value: 3, type: 'int' }
      ],
      output: "User 1 requesting license..."
    },
    {
      lineNumber: 19,
      variables: [
        { name: 'activeUsers', value: 1, type: 'int' },
        { name: 'id', value: 1, type: 'int' },
        { name: 'availableLicenses', value: 2, type: 'int' }
      ],
      output: "User 1 acquired license. Active users: 1"
    },
    {
      lineNumber: 14,
      variables: [
        { name: 'activeUsers', value: 1, type: 'int' },
        { name: 'id', value: 2, type: 'int' },
        { name: 'availableLicenses', value: 2, type: 'int' }
      ],
      output: "User 2 requesting license..."
    },
    {
      lineNumber: 19,
      variables: [
        { name: 'activeUsers', value: 2, type: 'int' },
        { name: 'id', value: 2, type: 'int' },
        { name: 'availableLicenses', value: 1, type: 'int' }
      ],
      output: "User 2 acquired license. Active users: 2"
    },
    {
      lineNumber: 14,
      variables: [
        { name: 'activeUsers', value: 2, type: 'int' },
        { name: 'id', value: 3, type: 'int' },
        { name: 'availableLicenses', value: 1, type: 'int' }
      ],
      output: "User 3 requesting license..."
    },
    {
      lineNumber: 19,
      variables: [
        { name: 'activeUsers', value: 3, type: 'int' },
        { name: 'id', value: 3, type: 'int' },
        { name: 'availableLicenses', value: 0, type: 'int' }
      ],
      output: "User 3 acquired license. Active users: 3"
    },
    {
      lineNumber: 14,
      variables: [
        { name: 'activeUsers', value: 3, type: 'int' },
        { name: 'id', value: 4, type: 'int' },
        { name: 'availableLicenses', value: 0, type: 'int' }
      ],
      output: "User 4 requesting license..."
    },
    {
      lineNumber: 32,
      variables: [
        { name: 'activeUsers', value: 2, type: 'int' },
        { name: 'id', value: 1, type: 'int' },
        { name: 'availableLicenses', value: 1, type: 'int' }
      ],
      output: "User 1 released license. Active users: 2"
    },
    {
      lineNumber: 19,
      variables: [
        { name: 'activeUsers', value: 3, type: 'int' },
        { name: 'id', value: 4, type: 'int' },
        { name: 'availableLicenses', value: 0, type: 'int' }
      ],
      output: "User 4 acquired license. Active users: 3"
    },
    {
      lineNumber: 32,
      variables: [
        { name: 'activeUsers', value: 2, type: 'int' },
        { name: 'id', value: 2, type: 'int' },
        { name: 'availableLicenses', value: 1, type: 'int' }
      ],
      output: "User 2 released license. Active users: 2"
    },
    {
      lineNumber: 14,
      variables: [
        { name: 'activeUsers', value: 2, type: 'int' },
        { name: 'id', value: 5, type: 'int' },
        { name: 'availableLicenses', value: 1, type: 'int' }
      ],
      output: "User 5 requesting license..."
    },
    {
      lineNumber: 32,
      variables: [
        { name: 'activeUsers', value: 1, type: 'int' },
        { name: 'id', value: 3, type: 'int' },
        { name: 'availableLicenses', value: 2, type: 'int' }
      ],
      output: "User 3 released license. Active users: 1"
    },
    {
      lineNumber: 19,
      variables: [
        { name: 'activeUsers', value: 2, type: 'int' },
        { name: 'id', value: 5, type: 'int' },
        { name: 'availableLicenses', value: 0, type: 'int' }
      ],
      output: "User 5 acquired license. Active users: 2"
    },
    {
      lineNumber: 32,
      variables: [
        { name: 'activeUsers', value: 1, type: 'int' },
        { name: 'id', value: 4, type: 'int' },
        { name: 'availableLicenses', value: 1, type: 'int' }
      ],
      output: "User 4 released license. Active users: 1"
    },
    {
      lineNumber: 32,
      variables: [
        { name: 'activeUsers', value: 0, type: 'int' },
        { name: 'id', value: 5, type: 'int' },
        { name: 'availableLicenses', value: 2, type: 'int' }
      ],
      output: "User 5 released license. Active users: 0"
    },
    {
      lineNumber: 49,
      variables: [
        { name: 'activeUsers', value: 0, type: 'int' },
        { name: 'availableLicenses', value: 3, type: 'int' }
      ],
      output: "Simulation complete."
    }
  ];

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    // simulation array is no longer used.
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Resource Allocation with Race Condition</h1>

      <div className="prose dark:prose-invert mb-8">
        <p>
          This example demonstrates a resource allocation system managing software licenses.
          It handles race conditions using semaphores and synchronized blocks to prevent
          concurrent access issues when multiple users request licenses simultaneously.
        </p>
        <ul>
          <li>Uses a semaphore to limit the number of concurrent licenses</li>
          <li>Implements synchronized blocks to safely update the active users count</li>
          <li>Simulates realistic usage patterns with multiple concurrent users</li>
        </ul>
      </div>

      <div className="space-y-8">
        <CodeBlock code={semaphoreCode} onExecute={executeCode} />
        <CodeVisualizer 
          code={semaphoreCode}
          executionStates={executionStates}
          isRunning={isRunning}
          onComplete={() => setIsRunning(false)}
        />
        <CodeExecution output={output} isRunning={isRunning} />
      </div>
    </motion.div>
  );
}