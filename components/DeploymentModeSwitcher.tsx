'use client';

import { useState, useRef, useEffect } from 'react';
import { Cloud, Server, Check, ChevronsUpDown } from 'lucide-react';

export type DeploymentMode = 'all' | 'cloud' | 'self-hosted';

interface DeploymentOption {
  id: DeploymentMode;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const deploymentOptions: DeploymentOption[] = [
  {
    id: 'cloud',
    title: 'Cloud',
    description: 'Parseable Cloud documentation',
    icon: <Cloud className="size-full" />,
  },
  {
    id: 'self-hosted',
    title: 'Self-hosted',
    description: 'Self-hosted deployment docs',
    icon: <Server className="size-full" />,
  },
];

interface DeploymentModeSwitcherProps {
  value: DeploymentMode;
  onChange: (mode: DeploymentMode) => void;
}

export function DeploymentModeSwitcher({ value, onChange }: DeploymentModeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = deploymentOptions.find((opt) => opt.id === value) || deploymentOptions[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-open={isOpen || undefined}
        className="w-full flex items-center gap-2 rounded-lg p-2 border bg-fd-secondary/50 text-start text-fd-secondary-foreground transition-colors hover:bg-fd-accent data-[open]:bg-fd-accent data-[open]:text-fd-accent-foreground"
      >
        <div className="size-5 shrink-0">{selectedOption.icon}</div>
        <p className="flex-1 text-sm font-medium">{selectedOption.title}</p>
        <ChevronsUpDown className="shrink-0 ms-auto size-4 text-fd-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-lg border border-fd-border bg-fd-popover shadow-lg p-1">
          {deploymentOptions.map((option) => {
            const isActive = option.id === value;
            return (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 rounded-lg p-1.5 hover:bg-fd-accent hover:text-fd-accent-foreground text-left"
              >
                <div className="shrink-0 size-5">{option.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">{option.title}</p>
                  <p className="text-[0.8125rem] text-fd-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
                <Check
                  className={`shrink-0 ms-auto size-3.5 text-fd-primary ${!isActive ? 'invisible' : ''}`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
