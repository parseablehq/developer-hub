'use client';

import { usePathname, useRouter } from 'next/navigation';
import { DeploymentModeSwitcher, type DeploymentMode } from './DeploymentModeSwitcher';

export function SidebarBanner() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Determine current mode from pathname
  const currentMode: DeploymentMode = pathname.startsWith('/self-hosted') ? 'self-hosted' : 'cloud';

  const handleModeChange = (mode: DeploymentMode) => {
    if (mode === 'cloud' && !pathname.startsWith('/cloud')) {
      router.push('/cloud/introduction');
    } else if (mode === 'self-hosted' && !pathname.startsWith('/self-hosted')) {
      router.push('/self-hosted/configuration');
    }
  };

  return (
    <div className="px-2 pt-1 pb-2">
      <DeploymentModeSwitcher value={currentMode} onChange={handleModeChange} />
    </div>
  );
}
