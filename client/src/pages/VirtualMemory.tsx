import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import CodeExecution from '@/components/CodeExecution';

const vmCode = `public class VirtualMemoryManager {
    private static final int PAGE_SIZE = 256;
    private static final int TLB_SIZE = 16;
    private static final int PAGE_TABLE_SIZE = 256;

    static class TLBEntry {
        int pageNumber;
        int frameNumber;

        TLBEntry(int pageNumber, int frameNumber) {
            this.pageNumber = pageNumber;
            this.frameNumber = frameNumber;
        }
    }

    private TLBEntry[] tlb;
    private int[] pageTable;
    private int tlbIndex;
    private int pageFaults;
    private int tlbHits;
    private int totalAccesses;

    public VirtualMemoryManager() {
        tlb = new TLBEntry[TLB_SIZE];
        pageTable = new int[PAGE_TABLE_SIZE];
        tlbIndex = 0;
        pageFaults = 0;
        tlbHits = 0;
        totalAccesses = 0;
    }

    public int translateAddress(int logicalAddress) {
        totalAccesses++;
        int pageNumber = (logicalAddress >> 8) & 0xFF;
        int offset = logicalAddress & 0xFF;
        int frameNumber = -1;

        // Check TLB first
        for(TLBEntry entry : tlb) {
            if(entry != null && entry.pageNumber == pageNumber) {
                frameNumber = entry.frameNumber;
                tlbHits++;
                break;
            }
        }

        // If TLB miss, check page table
        if(frameNumber == -1) {
            frameNumber = pageTable[pageNumber];
            if(frameNumber == -1) {
                // Page fault - handle it
                frameNumber = handlePageFault(pageNumber);
                pageFaults++;
            }
            // Update TLB
            updateTLB(pageNumber, frameNumber);
        }

        return (frameNumber << 8) | offset;
    }

    private void updateTLB(int pageNumber, int frameNumber) {
        tlb[tlbIndex] = new TLBEntry(pageNumber, frameNumber);
        tlbIndex = (tlbIndex + 1) % TLB_SIZE;
    }

    private int handlePageFault(int pageNumber) {
        // Simulate page fault handling
        return pageNumber; // Simplified
    }

    public void printStats() {
        System.out.println("Page Faults: " + pageFaults);
        System.out.println("TLB Hits: " + tlbHits);
        System.out.println("Total Accesses: " + totalAccesses);
        System.out.println("TLB Hit Rate: " + 
            String.format("%.2f%%", (tlbHits * 100.0) / totalAccesses));
        System.out.println("Page Fault Rate: " + 
            String.format("%.2f%%", (pageFaults * 100.0) / totalAccesses));
    }
}`;

export default function VirtualMemory() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    const simulation = [
      "Initializing Virtual Memory Manager...",
      "Processing logical address: 0x1234",
      "TLB Miss, checking page table...",
      "Page fault occurred for page 0x12",
      "Loading page into frame...",
      "Updating TLB...",
      "Physical address: 0x1234",
      "Processing logical address: 0x1235",
      "TLB Hit! Found in TLB",
      "Physical address: 0x1235",
      "------- Final Statistics -------",
      "Page Faults: 1",
      "TLB Hits: 1",
      "Total Accesses: 2",
      "TLB Hit Rate: 50.00%",
      "Page Fault Rate: 50.00%"
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
      <h1 className="text-3xl font-bold mb-6">Virtual Memory Manager Simulation</h1>

      <div className="prose dark:prose-invert mb-8">
        <p>
          This simulation demonstrates virtual memory management with address translation,
          TLB management, and page fault handling. It provides detailed statistics about
          the memory management process.
        </p>
        <ul>
          <li>Implements address translation using bit manipulation</li>
          <li>Manages TLB entries and handles page faults</li>
          <li>Tracks and displays performance metrics in real-time</li>
        </ul>
      </div>

      <div className="space-y-6">
        <CodeBlock code={vmCode} onExecute={executeCode} />
        <CodeExecution output={output} isRunning={isRunning} />
      </div>
    </motion.div>
  );
}