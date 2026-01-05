'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { DeploymentMode } from './DeploymentModeSwitcher';

interface DeploymentModeContextType {
  mode: DeploymentMode;
  setMode: (mode: DeploymentMode) => void;
}

const DeploymentModeContext = createContext<DeploymentModeContextType | null>(null);

const STORAGE_KEY = 'parseable-deployment-mode';

export function DeploymentModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DeploymentMode>('cloud');
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as DeploymentMode | null;
    if (stored && ['cloud', 'self-hosted'].includes(stored)) {
      setModeState(stored);
    }
    setMounted(true);
  }, []);

  const setMode = (newMode: DeploymentMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DeploymentModeContext.Provider value={{ mode, setMode }}>
      {children}
    </DeploymentModeContext.Provider>
  );
}

export function useDeploymentMode() {
  const context = useContext(DeploymentModeContext);
  if (!context) {
    return { mode: 'cloud' as DeploymentMode, setMode: () => {} };
  }
  return context;
}
