'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Copy, ExternalLink, MessageCircle } from 'lucide-react';

interface CopyPageDropdownProps {
  slug: string[];
  filePath: string;
}

const cache = new Map<string, string>();

// GitHub icon (from Fumadocs)
const GitHubIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Scira AI icon (from Fumadocs - sparkle/star pattern)
const SciraIcon = () => (
  <svg className="size-4" viewBox="0 0 910 934" fill="none">
    <path
      d="M647.664 197.775C569.13 189.049 525.5 145.419 516.774 66.8849C508.048 145.419 464.418 189.049 385.884 197.775C464.418 206.501 508.048 250.131 516.774 328.665C525.5 250.131 569.13 206.501 647.664 197.775Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinejoin="round"
    />
    <path
      d="M516.774 304.217C510.299 275.491 498.208 252.087 480.335 234.214C462.462 216.341 439.058 204.251 410.333 197.775C439.059 191.3 462.462 179.209 480.335 161.336C498.208 143.463 510.299 120.06 516.774 91.334C523.25 120.059 535.34 143.463 553.213 161.336C571.086 179.209 594.49 191.3 623.216 197.775C594.49 204.251 571.086 216.341 553.213 234.214C535.34 252.087 523.25 275.491 516.774 304.217Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinejoin="round"
    />
    <path
      d="M760.632 764.337C720.719 814.616 669.835 855.1 611.872 882.692C553.91 910.285 490.404 924.255 426.213 923.533C362.022 922.812 298.846 907.419 241.518 878.531C184.19 849.643 134.228 808.026 95.4548 756.863C56.6815 705.7 30.1238 646.346 17.8129 583.343C5.50207 520.339 7.76433 455.354 24.4266 393.359C41.089 331.364 71.7099 274.001 113.947 225.658C156.184 177.315 208.919 139.273 268.117 114.442"
      stroke="currentColor"
      strokeWidth="30"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ChatGPT/OpenAI icon (from Fumadocs)
const ChatGPTIcon = () => (
  <svg className="size-4" role="img" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364l2.0201-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

// Claude/Anthropic icon (from Fumadocs)
const ClaudeIcon = () => (
  <svg className="size-4" fill="currentColor" role="img" viewBox="0 0 24 24">
    <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
  </svg>
);

export function CopyPageDropdown({ slug, filePath }: CopyPageDropdownProps) {
  const [isOpenDropdownOpen, setIsOpenDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const openDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdownRef.current && !openDropdownRef.current.contains(event.target as Node)) {
        setIsOpenDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : `https://parseable.com/docs/${slug.join('/')}`;

  // Use the new .mdx endpoint for LLM-friendly markdown
  const markdownUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}.mdx`
    : `https://parseable.com/docs/${slug.join('/')}.mdx`;

  const githubEditUrl = `https://github.com/parseablehq/developer-hub/blob/main/content/docs/${filePath}`;

  const getPageContent = async (): Promise<string> => {
    let content = cache.get(markdownUrl);
    if (!content) {
      try {
        const res = await fetch(markdownUrl);
        content = await res.text();
        cache.set(markdownUrl, content);
      } catch {
        content = '';
      }
    }
    return content;
  };

  const handleCopyMarkdown = async () => {
    const content = await getPageContent();
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInGitHub = () => {
    window.open(githubEditUrl, '_blank');
    setIsOpenDropdownOpen(false);
  };

  const handleOpenInSciraAI = async () => {
    const content = await getPageContent();
    const prompt = `Please help me understand this Parseable documentation page (${currentUrl}):\n\n${content}`;
    window.open(`https://scira.ai/search?q=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpenDropdownOpen(false);
  };

  const handleOpenInChatGPT = async () => {
    const content = await getPageContent();
    const prompt = `Please help me understand this Parseable documentation page (${currentUrl}):\n\n${content}`;
    window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpenDropdownOpen(false);
  };

  const handleOpenInClaude = async () => {
    const content = await getPageContent();
    const prompt = `Please help me understand this Parseable documentation page (${currentUrl}):\n\n${content}`;
    window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpenDropdownOpen(false);
  };

  const handleOpenInT3Chat = async () => {
    const content = await getPageContent();
    const prompt = `Please help me understand this Parseable documentation page (${currentUrl}):\n\n${content}`;
    window.open(`https://t3.chat/?q=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpenDropdownOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Copy Markdown Button */}
      <button
        onClick={handleCopyMarkdown}
        className="inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md border border-fd-border bg-fd-secondary/50 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
      >
        {copied ? (
          <Check className="size-3 text-green-500" />
        ) : (
          <Copy className="size-3" />
        )}
        Copy Markdown
      </button>

      {/* Open Dropdown */}
      <div className="relative" ref={openDropdownRef}>
        <button
          onClick={() => setIsOpenDropdownOpen(!isOpenDropdownOpen)}
          className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border border-fd-border bg-fd-secondary/50 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors"
        >
          Open
          <ChevronDown className={`size-3 transition-transform ${isOpenDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpenDropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-52 rounded-lg border border-fd-border bg-fd-popover shadow-lg z-50">
            <div className="py-1">
              {/* Open in GitHub */}
              <button
                onClick={handleOpenInGitHub}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-fd-accent transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <GitHubIcon />
                  <span>Open in GitHub</span>
                </div>
                <ExternalLink className="size-3 text-fd-muted-foreground" />
              </button>

              {/* Open in Scira AI */}
              <button
                onClick={handleOpenInSciraAI}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-fd-accent transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <SciraIcon />
                  <span>Open in Scira AI</span>
                </div>
                <ExternalLink className="size-3 text-fd-muted-foreground" />
              </button>

              {/* Open in ChatGPT */}
              <button
                onClick={handleOpenInChatGPT}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-fd-accent transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <ChatGPTIcon />
                  <span>Open in ChatGPT</span>
                </div>
                <ExternalLink className="size-3 text-fd-muted-foreground" />
              </button>

              {/* Open in Claude */}
              <button
                onClick={handleOpenInClaude}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-fd-accent transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <ClaudeIcon />
                  <span>Open in Claude</span>
                </div>
                <ExternalLink className="size-3 text-fd-muted-foreground" />
              </button>

              {/* Open in T3 Chat */}
              <button
                onClick={handleOpenInT3Chat}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-fd-accent transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="size-4" />
                  <span>Open in T3 Chat</span>
                </div>
                <ExternalLink className="size-3 text-fd-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
