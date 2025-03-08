import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  onExecute?: () => void;
}

export default function CodeBlock({ code, onExecute }: CodeBlockProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-muted">
        <span className="text-sm font-medium">Java Example</span>
        {onExecute && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsHighlighted(true);
              onExecute();
              setTimeout(() => setIsHighlighted(false), 1000);
            }}
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            Execute
          </Button>
        )}
      </div>
      <motion.pre
        animate={{ backgroundColor: isHighlighted ? 'var(--primary)' : 'transparent' }}
        className="p-4 font-mono text-sm overflow-x-auto"
      >
        <code>{code}</code>
      </motion.pre>
    </Card>
  );
}
