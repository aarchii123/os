import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import CodeExecution from '@/components/CodeExecution';

const lruCode = `public class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
    }
    
    private HashMap<Integer, Node> map;
    private Node head, tail;
    private int capacity, count;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node();
        tail = new Node();
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        Node node = map.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.value;
    }
}`;

export default function VirtualMemory() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    const simulation = [
      "Created LRU Cache with capacity 3",
      "Adding page 1 to cache",
      "Adding page 2 to cache",
      "Adding page 3 to cache",
      "Page 1 accessed (hit)",
      "Adding page 4 (evicting page 2)",
      "Cache state: [4, 3, 1]"
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
      <h1 className="text-3xl font-bold mb-6">Virtual Memory and Paging</h1>
      
      <div className="prose dark:prose-invert mb-8">
        <p>
          Virtual memory is a memory management technique that provides an idealized
          abstraction of the storage resources that are actually available on a given
          machine. The LRU (Least Recently Used) algorithm is commonly used for page
          replacement.
        </p>
      </div>

      <div className="space-y-6">
        <CodeBlock code={lruCode} onExecute={executeCode} />
        <CodeExecution output={output} isRunning={isRunning} />
      </div>
    </motion.div>
  );
}
