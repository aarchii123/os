import { useState } from 'react';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/CodeBlock';
import CodeExecution from '@/components/CodeExecution';

const sudokuCode = `public class SudokuValidator {
    private static final int SIZE = 9;
    private static int[][] board = {
        {5,3,4,6,7,8,9,1,2},
        {6,7,2,1,9,5,3,4,8},
        {1,9,8,3,4,2,5,6,7},
        {8,5,9,7,6,1,4,2,3},
        {4,2,6,8,5,3,7,9,1},
        {7,1,3,9,2,4,8,5,6},
        {9,6,1,5,3,7,2,8,4},
        {2,8,7,4,1,9,6,3,5},
        {3,4,5,2,8,6,1,7,9}
    };

    static class ValidationResult {
        boolean isValid;
        String section;

        ValidationResult(boolean isValid, String section) {
            this.isValid = isValid;
            this.section = section;
        }
    }

    static class RowValidator extends Thread {
        private int row;
        private ValidationResult result;

        RowValidator(int row) {
            this.row = row;
        }

        public void run() {
            boolean[] seen = new boolean[SIZE + 1];
            for(int i = 0; i < SIZE; i++) {
                int num = board[row][i];
                if(seen[num]) {
                    result = new ValidationResult(false, 
                        "Row " + (row + 1) + " has duplicate: " + num);
                    return;
                }
                seen[num] = true;
            }
            result = new ValidationResult(true, 
                "Row " + (row + 1) + " is valid");
        }

        public ValidationResult getResult() {
            return result;
        }
    }

    // Similar implementations for ColumnValidator and SubgridValidator

    public static void main(String[] args) {
        Thread[] threads = new Thread[27]; // 9 rows + 9 columns + 9 subgrids
        // Start validation threads...
        // Collect and process results...
    }
}`;

export default function Multithreading() {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    const simulation = [
      "Starting Sudoku validation...",
      "Launching row validation threads...",
      "Row 1 is valid",
      "Row 2 is valid",
      "Row 3 is valid",
      "Launching column validation threads...",
      "Column 1 is valid",
      "Column 2 is valid",
      "Column 3 is valid",
      "Launching subgrid validation threads...",
      "Subgrid (0,0) is valid",
      "Subgrid (0,1) is valid",
      "Subgrid (0,2) is valid",
      "All threads completed",
      "Final Result: Sudoku solution is valid!"
    ];

    simulation.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (i === simulation.length - 1) {
          setIsRunning(false);
        }
      }, i * 800);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6">Sudoku Validator using Threads</h1>

      <div className="prose dark:prose-invert mb-8">
        <p>
          This multithreaded Sudoku validator demonstrates parallel processing by using
          separate threads to validate different sections of a Sudoku puzzle simultaneously.
        </p>
        <ul>
          <li>Validates rows, columns, and 3×3 subgrids in parallel</li>
          <li>Uses thread synchronization to collect validation results</li>
          <li>Provides real-time feedback as each thread completes its validation</li>
        </ul>
      </div>

      <div className="space-y-6">
        <CodeBlock code={sudokuCode} onExecute={executeCode} />
        <CodeExecution output={output} isRunning={isRunning} />
      </div>
    </motion.div>
  );
}