'use client';

import { Search } from 'lucide-react';
import { useSearch } from './SearchProvider';

export default function SearchButton() {
  const { setOpen } = useSearch();

  return (
    <button
      onClick={() => setOpen(true)}
      className="inline-flex items-center justify-between w-full gap-2 px-3 py-1.5 text-sm rounded-lg border border-fd-border bg-fd-background hover:bg-fd-accent transition-colors text-fd-muted-foreground hover:text-fd-foreground"
      title="Search (⌘K)"
    >
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </div>
      <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs rounded bg-fd-muted font-mono">
        ⌘K
      </kbd>
    </button>
  );
}
