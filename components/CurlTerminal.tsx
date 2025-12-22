'use client';

import dynamic from 'next/dynamic';

const TerminalContent = dynamic(() => import('./TerminalContent'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 min-h-[200px] flex items-center justify-center">
      Loading terminal...
    </div>
  ),
});

interface CurlTerminalProps {
  command: string;
  title?: string;
}

export default function CurlTerminal({ command, title }: CurlTerminalProps) {
  return (
    <div className="my-4">
      {title && (
        <div className="text-sm text-gray-500 mb-2">{title}</div>
      )}
      <TerminalContent command={command} />
    </div>
  );
}
