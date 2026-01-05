'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { Sparkles, Search, Loader2, ExternalLink, X, FileText } from 'lucide-react';
import Link from 'next/link';

interface AISearchResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

interface AISearchResponse {
  answer: string | null;
  results: AISearchResult[];
}

type SearchTab = 'docs' | 'ai';

interface CustomSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomSearchDialog({ open, onOpenChange }: CustomSearchDialogProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>('docs');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AISearchResponse | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normal docs search
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
  });

  // Focus input when dialog opens or tab changes
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, activeTab]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch('');
      setAiQuery('');
      setAiResponse(null);
      setAiError(null);
      setActiveTab('docs');
    }
  }, [open, setSearch]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onOpenChange]);

  // AI Search handler
  const handleAISearch = useCallback(async () => {
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiError(null);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: aiQuery.trim() }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data: AISearchResponse = await res.json();
      setAiResponse(data);
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setAiLoading(false);
    }
  }, [aiQuery]);

  const handleAIKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !aiLoading) {
      handleAISearch();
    }
  };

  if (!open) return null;

  const docsResults = query.data !== 'empty' ? query.data : null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm">
      <div
        ref={dialogRef}
        className="w-full max-w-2xl mx-4 bg-fd-background border border-fd-border rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-fd-border bg-fd-muted/30">
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'docs'
                ? 'border-fd-primary text-fd-foreground bg-fd-background'
                : 'border-transparent text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            <Search className="w-4 h-4" />
            Docs
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === 'ai'
                ? 'border-purple-500 text-fd-foreground bg-fd-background'
                : 'border-transparent text-fd-muted-foreground hover:text-fd-foreground'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            AI Search
          </button>
        </div>

        {/* Docs Search Tab */}
        {activeTab === 'docs' && (
          <>
            <div className="flex items-center gap-3 p-3 border-b border-fd-border">
              <Search className="w-5 h-5 text-fd-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-fd-foreground placeholder:text-fd-muted-foreground outline-none text-sm"
              />
              {query.isLoading && (
                <Loader2 className="w-4 h-4 text-fd-muted-foreground animate-spin" />
              )}
              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 rounded-md hover:bg-fd-accent transition-colors"
              >
                <X className="w-4 h-4 text-fd-muted-foreground" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {docsResults && docsResults.length > 0 ? (
                <div className="p-2">
                  {docsResults.map((item, index: number) => (
                    <Link
                      key={index}
                      href={item.url}
                      onClick={() => onOpenChange(false)}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-fd-accent transition-colors group"
                    >
                      <FileText className="w-4 h-4 text-fd-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-fd-foreground group-hover:text-fd-primary truncate">
                          {item.content}
                        </div>
                        {item.type === 'page' && (
                          <div className="text-xs text-fd-muted-foreground mt-0.5 truncate">
                            {item.url}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : search && !query.isLoading ? (
                <div className="py-8 text-center text-sm text-fd-muted-foreground">
                  No results found for &quot;{search}&quot;
                </div>
              ) : !search ? (
                <div className="py-8 text-center">
                  <Search className="w-8 h-8 text-fd-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-fd-muted-foreground">
                    Type to search documentation
                  </p>
                </div>
              ) : null}
            </div>
          </>
        )}

        {/* AI Search Tab */}
        {activeTab === 'ai' && (
          <>
            <div className="flex items-center gap-3 p-3 border-b border-fd-border">
              <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={handleAIKeyDown}
                placeholder="Ask AI about Parseable..."
                className="flex-1 bg-transparent text-fd-foreground placeholder:text-fd-muted-foreground outline-none text-sm"
              />
              {aiLoading ? (
                <Loader2 className="w-4 h-4 text-fd-muted-foreground animate-spin" />
              ) : (
                <button
                  onClick={handleAISearch}
                  disabled={!aiQuery.trim()}
                  className="p-1.5 rounded-md hover:bg-fd-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Search className="w-4 h-4 text-fd-muted-foreground" />
                </button>
              )}
              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 rounded-md hover:bg-fd-accent transition-colors"
              >
                <X className="w-4 h-4 text-fd-muted-foreground" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-3">
              {aiError && (
                <div className="p-3 text-red-500 text-sm rounded-lg bg-red-500/10">
                  {aiError}
                </div>
              )}

              {aiResponse && (
                <div className="space-y-4">
                  {aiResponse.answer && (
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-medium text-purple-500">AI Answer</span>
                      </div>
                      <p className="text-fd-foreground text-sm leading-relaxed">
                        {aiResponse.answer}
                      </p>
                    </div>
                  )}

                  {aiResponse.results.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-medium text-fd-muted-foreground px-1">
                        Related Documentation
                      </h3>
                      {aiResponse.results.map((result, index) => (
                        <a
                          key={index}
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 rounded-lg border border-fd-border hover:bg-fd-accent transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-medium text-fd-foreground group-hover:text-fd-primary line-clamp-1">
                              {result.title}
                            </h4>
                            <ExternalLink className="w-3 h-3 text-fd-muted-foreground flex-shrink-0 mt-0.5" />
                          </div>
                          <p className="text-xs text-fd-muted-foreground mt-1 line-clamp-2">
                            {result.content}
                          </p>
                        </a>
                      ))}
                    </div>
                  )}

                  {aiResponse.results.length === 0 && !aiResponse.answer && (
                    <p className="text-sm text-fd-muted-foreground text-center py-4">
                      No results found. Try a different search query.
                    </p>
                  )}
                </div>
              )}

              {!aiResponse && !aiError && !aiLoading && (
                <div className="py-8 text-center">
                  <Sparkles className="w-8 h-8 text-purple-500/50 mx-auto mb-3" />
                  <p className="text-sm text-fd-muted-foreground">
                    Ask questions about Parseable
                  </p>
                  <p className="text-xs text-fd-muted-foreground mt-1">
                    Press Enter to search
                  </p>
                </div>
              )}

              {aiLoading && (
                <div className="py-8 text-center">
                  <Loader2 className="w-6 h-6 text-purple-500 mx-auto mb-3 animate-spin" />
                  <p className="text-sm text-fd-muted-foreground">
                    Searching with AI...
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="px-4 py-2 border-t border-fd-border bg-fd-muted/30">
          <div className="flex items-center justify-between text-xs text-fd-muted-foreground">
            <span>
              {activeTab === 'ai' ? (
                <>Press <kbd className="px-1.5 py-0.5 rounded bg-fd-accent font-mono">Enter</kbd> to search</>
              ) : (
                <>Type to search</>
              )}
            </span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-fd-accent font-mono">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
