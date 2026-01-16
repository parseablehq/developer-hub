'use client';

import { useState, useCallback, ReactNode } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children?: ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Extract language from className (e.g., "language-yaml")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const language = className?.replace('language-', '') || '';
  
  // Get the text content from children
  const getTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (!node) return '';
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (typeof node === 'object' && node !== null && 'props' in node) {
      const element = node as { props: { children?: ReactNode } };
      return getTextContent(element.props.children);
    }
    return '';
  };

  const codeText = getTextContent(children);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeText]);

  return (
    <div className="relative group">
      <button
        onClick={copyCode}
        className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-all opacity-0 group-hover:opacity-100 z-10"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <code className={className}>
        {children}
      </code>
    </div>
  );
}
