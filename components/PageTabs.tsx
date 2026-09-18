'use client';

import { useEffect, useState, type ComponentProps, type MouseEvent } from 'react';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

type PageTabsProps = ComponentProps<typeof Tabs> & {
  queryParam?: string;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function PageTabs({
  className,
  items = [],
  queryParam = 'tab',
  defaultIndex = 0,
  ...props
}: PageTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  useEffect(() => {
    const syncFromUrl = () => {
      const selected = new URL(window.location.href).searchParams.get(queryParam);
      const index = items.findIndex((item) => slugify(item) === selected);
      setSelectedIndex(index >= 0 ? index : defaultIndex);
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [defaultIndex, items, queryParam]);

  const updateUrl = (event: MouseEvent<HTMLDivElement>) => {
    const trigger = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (!trigger) return;

    const index = items.findIndex((item) => item === trigger.textContent?.trim());
    if (index < 0 || index === selectedIndex) return;

    const url = new URL(window.location.href);
    url.hash = '';
    url.searchParams.set(queryParam, slugify(items[index]));
    window.history.pushState(null, '', url);
    setSelectedIndex(index);
  };

  return (
    <Tabs
      key={selectedIndex}
      items={items}
      defaultIndex={selectedIndex}
      onClick={updateUrl}
      className={`my-8 overflow-visible rounded-none border-0 bg-transparent
        [&_[role=tablist]]:w-full [&_[role=tablist]]:gap-0
        [&_[role=tablist]]:border-b [&_[role=tablist]]:border-fd-border
        [&_[role=tablist]]:bg-transparent [&_[role=tablist]]:px-0
        [&_[role=tab]]:-mb-px [&_[role=tab]]:justify-center
        [&_[role=tab]]:rounded-none [&_[role=tab]]:border-0
        [&_[role=tab]]:border-b-2 [&_[role=tab]]:border-transparent
        [&_[role=tab]]:px-4 [&_[role=tab]]:py-3 [&_[role=tab]]:font-medium
        [&_[role=tab]]:text-fd-muted-foreground
        [&_[role=tab][data-state=active]]:border-fd-primary
        [&_[role=tab][data-state=active]]:bg-transparent
        [&_[role=tab][data-state=active]]:text-fd-primary
        [&_[role=tab][data-state=active]]:shadow-none ${className ?? ''}`}
      {...props}
    />
  );
}

export function PageTab({ className, ...props }: ComponentProps<typeof Tab>) {
  return (
    <Tab
      className={`rounded-none bg-transparent p-0 pt-7 text-base ${className ?? ''}`}
      {...props}
    />
  );
}
