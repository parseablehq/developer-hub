'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  links?: { title: string; url: string; content: string }[];
}

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

export function AskAITrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-4 end-4 z-40 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-2xl border border-fd-border bg-fd-background text-fd-muted-foreground shadow-lg hover:bg-fd-accent hover:text-fd-accent-foreground transition-all ${
          open ? 'translate-y-20 opacity-0 pointer-events-none' : ''
        }`}
      >
        <MessageCircle className="size-4" />
        Ask AI
      </button>
      <AskAIPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function AskAIPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!res.ok) throw new Error('Failed to get response');

      const data: AISearchResponse = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer || 'I found some relevant documentation for you.',
        links: data.results.map((r) => ({
          title: r.title,
          url: r.url,
          content: r.content,
        })),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 z-40 bg-fd-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed z-50 bg-fd-popover text-fd-popover-foreground border border-fd-border shadow-xl
          max-lg:inset-x-2 max-lg:top-4 max-lg:bottom-4 max-lg:rounded-2xl
          lg:bottom-4 lg:end-4 lg:w-[400px] lg:h-[600px] lg:max-h-[80vh] lg:rounded-2xl
          flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-fd-border">
          <h2 className="font-semibold text-fd-foreground">Ask AI</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-fd-accent transition-colors"
          >
            <X className="size-4 text-fd-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <MessageCircle className="size-10 text-fd-muted-foreground/30 mb-3" />
              <p className="text-sm text-fd-muted-foreground">
                Ask questions about Parseable
              </p>
              <p className="text-xs text-fd-muted-foreground mt-1">
                I&apos;ll search the documentation for you
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex items-start gap-2">
                <span
                  className={`text-xs font-medium ${
                    message.role === 'assistant'
                      ? 'text-fd-primary'
                      : 'text-fd-muted-foreground'
                  }`}
                >
                  {message.role === 'user' ? 'you' : 'parseable'}
                </span>
              </div>
              <div className="text-sm text-fd-foreground leading-relaxed">
                {message.content}
              </div>
              {message.links && message.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-fd-border hover:bg-fd-accent transition-colors"
                    >
                      <span className="truncate max-w-[200px]">{link.title}</span>
                      <ExternalLink className="size-3 text-fd-muted-foreground flex-shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-fd-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span>Searching...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-fd-border">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 rounded-xl border border-fd-border bg-fd-card focus-within:ring-2 focus-within:ring-fd-ring">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question..."
                rows={1}
                className="w-full px-3 py-2.5 text-sm bg-transparent resize-none focus:outline-none placeholder:text-fd-muted-foreground"
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
