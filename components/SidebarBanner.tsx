'use client';

import { DeploymentModeSwitcher } from './DeploymentModeSwitcher';
import { useDeploymentMode } from './DeploymentModeProvider';

export function SidebarBanner() {
  const { mode, setMode } = useDeploymentMode();

  return (
    <div className="px-2 pt-1 pb-2">
      <DeploymentModeSwitcher value={mode} onChange={setMode} />
    </div>
  );
}
