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
    <Card className="overflow-hidden border-2 transition-colors dark:bg-background/50">
      <div className="flex items-center justify-between p-3 bg-muted dark:bg-muted/20">
        <span className="text-sm font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Java Implementation
        </span>
        {onExecute && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsHighlighted(true);
              onExecute();
              setTimeout(() => setIsHighlighted(false), 1000);
            }}
            className="hover:bg-primary/10"
          >
            <PlayCircle className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Execute</span>
          </Button>
        )}
      </div>
      <motion.div
        animate={{ 
          backgroundColor: isHighlighted ? 'var(--primary)' : 'transparent',
          color: isHighlighted ? 'white' : 'inherit'
        }}
        className="relative"
      >
        <pre className="p-4 font-mono text-[13px] md:text-sm overflow-x-auto transition-colors">
          <code>{code}</code>
        </pre>
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/10 pointer-events-none" />
      </motion.div>
    </Card>
  );
}